import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Profile]),
    JwtModule.register({ global: true }),
    PassportModule,
  ], // Add your entities here
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, JwtStrategy],
})
export class AuthModule {}
