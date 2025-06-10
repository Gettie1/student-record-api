import {
  IsEmail,
  IsString,
  IsDate,
  IsBoolean,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Unique username for the admin',
    example: 'adminUser123',
  })
  @IsString()
  username: string;
  @ApiProperty({
    description: 'Password for the admin account',
    example: 'securePassword123',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
  @ApiProperty({
    description: 'Email address of the admin',
    example: 'admi@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Timestamp of the admin account creation',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  lastLogin: Date;
  @ApiProperty({
    description: 'Indicates if the admin has super admin privileges',
    example: true,
  })
  @IsBoolean()
  isSuperAdmin: boolean;
  @ApiProperty({
    description: 'Unique identifier for the admin',
    example: 1,
  })
  @IsNumber()
  profileId: number;
}
