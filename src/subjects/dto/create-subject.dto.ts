//subject_id	INT	Primary Key, auto-incremented
// subject_name	VARCHAR	Name of the subject
// course_id	INT	Foreign Key referencing courses
// created_at	DATETIME	Timestamp when the subject was created
// updated_at	DATETIME	Timestamp when the subject was updated
// credits	INT	Credits assigned to the subject
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsOptional } from 'class-validator';
export class CreateSubjectDto {
  @ApiProperty({
    description: 'Unique identifier for the subject',
    example: 'subject12345',
  })
  @IsString()
  subjectName: string;
  @ApiProperty({
    description: 'Unique identifier for the course',
    example: 'course12345',
  })
  @IsString()
  courseId: string; // Foreign Key referencing courses
  @ApiProperty({
    description: 'Timestamp when the subject was created',
    example: '2023-10-01T12:00:00Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt: string;
  @ApiProperty({
    description: 'Timestamp when the subject was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAt: string; // Assuming this is a string for simplicity, can be Date if needed
  @ApiProperty({
    description: 'Credits assigned to the subject',
    example: '3',
  })
  @IsString()
  credits: string; // Assuming credits is a string, can be changed to number if needed
}
