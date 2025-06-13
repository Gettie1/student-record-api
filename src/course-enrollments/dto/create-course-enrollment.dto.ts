// enrollment_id	INT	Primary Key, auto-incremented
// student_id	INT	Foreign Key referencing students
// course_id	INT	Foreign Key referencing courses
// enroll_date	DATETIME	Date the student enrolled in the course
// grade	VARCHAR	Grade or performance in the course
// status	VARCHAR	Enrollment status (active/inactive)
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCourseEnrollmentDto {
  @ApiProperty({
    description: 'Unique identifier for the course enrollment',
    example: 1,
  })
  @IsInt()
  id: number;
  @ApiProperty({
    description: 'Unique identifier for the course',
    example: 12345,
  })
  @IsString()
  course_id: string;
  @ApiProperty({
    description: 'Unique identifier for the enrolled date',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  enroll_date: Date;
  @ApiProperty({
    description: 'Grade or performance in the course',
    example: 'A',
  })
  @IsOptional()
  @IsString()
  grade?: string;
  @ApiProperty({
    description: 'Status of the course enrollment (e.g., active, inactive)',
    example: 'active',
  })
  @IsOptional()
  @IsString()
  status?: string;
}
