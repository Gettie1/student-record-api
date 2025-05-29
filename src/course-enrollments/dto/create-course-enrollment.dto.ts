// enrollment_id	INT	Primary Key, auto-incremented
// student_id	INT	Foreign Key referencing students
// course_id	INT	Foreign Key referencing courses
// enroll_date	DATETIME	Date the student enrolled in the course
// grade	VARCHAR	Grade or performance in the course
// status	VARCHAR	Enrollment status (active/inactive)
import { IsInt, IsOptional, IsString, IsDate } from 'class-validator';
export class CreateCourseEnrollmentDto {
  @IsInt()
  student_id: number;

  @IsInt()
  course_id: number;

  @IsDate()
  enroll_date: Date;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
