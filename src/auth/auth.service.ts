import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
    private configService: ConfigService, // Assuming ConfigService is imported and used for environment variables
  ) {}
  private async getTokens(id: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, email },
        {
          secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow(
            'JWT_ACCESS_TOKEN_EXPIRE_IN',
          ),
        },
      ),
      this.jwtService.signAsync(
        { sub: id, email },
        {
          secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow(
            'JWT_REFRESH_TOKEN_EXPIRE_IN',
          ),
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
  private async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }
  private async saveRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.profileRepository.update(id, {
      hashedRefreshToken,
    });
  }

  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.profileRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException(
        `User with ${createAuthDto.email} not found`,
      );
    }
    const foundPassword = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );
    if (!foundPassword) {
      throw new NotFoundException('Invalid password');
    }
    const { accessToken, refreshToken } = await this.getTokens(
      user.id,
      user.email,
    );
    await this.saveRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async signOut(id: string) {
    const user = await this.profileRepository.findOne({
      where: { id: Number(id) },
      select: ['id', 'email', 'firstName', 'lastName', 'role'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.profileRepository.update(user.id, {
      hashedRefreshToken: null,
    });
    return { message: 'User signed out successfully' };
  }
  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.profileRepository.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'role',
        'hashedRefreshToken',
      ],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (!user.hashedRefreshToken) {
      throw new NotFoundException('No refresh token found for this user');
    }
    // const refreshToken = user.hashedRefreshToken;
    const isValid = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
    if (!isValid) {
      throw new NotFoundException('Invalid refresh token');
    }
    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      user.id,
      user.email,
    );
    await this.saveRefreshToken(user.id, newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  }
}
