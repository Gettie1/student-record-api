import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../entities/profile.entity'; // Adjust the import path as necessary
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Unique identifier for the profile',
    example: 'profile12345',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Unique identifier for the profile',
    example: 'profile12345',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'profile@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role of the user in the system',
    example: 'student',
    enum: ['student', 'user', 'administrator'],
  })
  @IsString()
  @IsEnum(Role, {
    message: 'Role must be one of the following: student, user, administrator',
  })
  role: Role = Role.STUDENT; // Default role set to GUEST
}
