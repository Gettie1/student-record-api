import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
// Import your user repository or service
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
    // Use the email parameter to avoid the unused variable error
    // For example, log or include it in a token payload
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
    // Here you would typically validate the password and generate tokens
    const foundPassword = await this.profileRepository.findOne({
      where: { password: createAuthDto.password },
    });
    if (!foundPassword) {
      throw new NotFoundException('Invalid password');
    }
    //if password matches, generate tokens
    const tokens = this.getTokens(user.id, user.email);
    return tokens;
  }

  async signOut(id: string) {
    // Here you would typically invalidate the user's session or token
    // For simplicity, let's assume the sign-out is successful
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
