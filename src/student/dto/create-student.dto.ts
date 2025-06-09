// import 'reflect-metadata';
// import { Type } from 'class-transformer';
import { IsEmail, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateStudentDto {
  // @IsString()
  // studentId: string;
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: '12345',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the student',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Email address of the student',
    example: 'john@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Date of birth of the student',
    example: '2000-01-01',
  })
  @Type(() => Date)
  @IsDate()
  dateOfBirth: string;

  @ApiProperty({
    description: 'sdfghj',
    example: 'male',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'Phone number of the student',
    example: '+1234567890',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'Address of the student',
    example: '123 Main St, Springfield',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Country of the student',
    example: 'USA',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'State of the student',
    example: 'California',
  })
  @IsString()
  state: string;

  @ApiProperty({
    description: 'City of the student',
    example: 'Los Angeles',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Enrollment date of the student',
    example: '2023-01-01',
  })
  @Type(() => Date)
  @IsDate()
  enrollmentDate: string;

  @ApiProperty({
    description: 'Status of the student',
    example: 'active',
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Profile picture URL of the student',
    example: 'https://example.com/profile.jpg',
  })
  // @IsOptional()
  @ApiProperty({
    description: 'Profile picture URL of the student',
    example: 'https://example.com/profile.jpg',
  })
  @IsString()
  profilePicture: string;

  @ApiProperty({
    description: 'Profile ID associated with the student',
    example: 'profile123',
  })
  @IsString()
  profileId: string;
}
