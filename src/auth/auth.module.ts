import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@faker-js/faker/.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Profile])], // Add your entities here
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
