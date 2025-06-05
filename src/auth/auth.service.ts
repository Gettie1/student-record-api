import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  refreshTokens() {}
  private getTokens(id: number, email: string) {
    return { accessToken: `token-for-${id}-${email}` };
  }
  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.profileRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['id', 'email', 'firstName', 'lastName', 'role'],
    });
    if (!user) {
      throw new NotFoundException('User with ${createAuthDto.email} not found');
    }
    const foundPassword = await this.profileRepository.findOne({
      where: { password: createAuthDto.password },
    });
    if (!foundPassword) {
      throw new NotFoundException('Invalid password');
    }
    const tokens = this.getTokens(user.id, user.email);
    return tokens;
  }

  async signOut(id: string) {
    if (!id) {
      throw new NotFoundException('User ID is required');
    }
    const user = await this.profileRepository.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User signed out successfully',
      user,
    };
  }
}
