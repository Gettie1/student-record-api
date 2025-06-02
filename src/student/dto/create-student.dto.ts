// import 'reflect-metadata';
// import { Type } from 'class-transformer';
import { IsEmail, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateStudentDto {
  // @IsString()
  // studentId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @Type(() => Date)
  @IsDate()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @Type(() => Date)
  @IsDate()
  enrollmentDate: string;

  @IsString()
  status: string;

  // @IsOptional()
  @IsString()
  profilePicture: string;
}
