//subject_id	INT	Primary Key, auto-incremented
// subject_name	VARCHAR	Name of the subject
// course_id	INT	Foreign Key referencing courses
// created_at	DATETIME	Timestamp when the subject was created
// updated_at	DATETIME	Timestamp when the subject was updated
// credits	INT	Credits assigned to the subject
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';
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
  @IsNumber()
  courseId: number; // Foreign Key referencing courses
  @ApiProperty({
    description: 'Timestamp when the subject was created',
    example: '2023-10-01T12:00:00Z',
  })
  @IsDate()
  createdAt: Date;
  @ApiProperty({
    description: 'Timestamp when the subject was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @IsDate()
  updatedAt: Date;
  @IsNumber()
  credits: number;
}
