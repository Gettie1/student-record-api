import { Type } from 'class-transformer';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Name of the course',
    example: 'Bachelor of Science in Computer Science',
  })
  @IsString()
  courseName: string;
  @ApiProperty({
    description: 'Unique code for the course',
    example: 'CS101',
  })
  @IsString()
  courseCode: string;
  @ApiProperty({
    description: 'Timestamp when the course was created',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  createdAt: Date;
  @ApiProperty({
    description: 'Timestamp when the course was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;
  @ApiProperty({
    description: 'Number of credits assigned to the course',
    example: 3,
  })
  @IsNumber()
  credits: number;
  @ApiProperty({
    description: 'Description of the course',
    example:
      'An introductory course in computer science covering basic concepts.',
  })
  @IsString()
  description: string;
  @ApiProperty({
    description: 'Status of the course (e.g., active, inactive)',
    example: 'active',
  })
  @IsString()
  status: string;
}
