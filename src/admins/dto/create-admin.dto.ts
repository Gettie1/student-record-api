import {
  IsEmail,
  IsString,
  IsDate,
  IsBoolean,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsEmail()
  email: string;

  @Type(() => Date)
  @IsDate()
  lastLogin: Date;

  @IsBoolean()
  isSuperAdmin: boolean;

  @IsNumber()
  admin_id: number;
}
