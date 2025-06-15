//
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRegistrationDto {
  @ApiProperty({
    description: 'Unique identifier for the registration',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'user12345',
  })
  @IsString()
  @IsNotEmpty()
  courseId: string;
  @ApiProperty({
    description: 'Unique identifier for the session',
    example: 'session12345',
  })
  @IsString()
  @IsNotEmpty()
  sessionId: string;
  @ApiProperty({
    description: 'Unique identifier for the subject',
    example: 'subject12345',
  })
  @IsString()
  @IsNotEmpty()
  subjectId: string;
  @ApiProperty({
    description: 'Date when the registration was made',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  registrationDate: Date; // ISO date string, e.g., '2023-10-01T12:00:00Z'
  @ApiProperty({
    description: 'Status of the registration',
    example: 'pending',
  })
  @IsString()
  @IsNotEmpty()
  status: string; // e.g., 'pending', 'approved', 'rejected'
}
