// //course_id	INT	Primary Key, auto-incremented
// course_name	VARCHAR	Name of the course
// course_code	VARCHAR	Unique code for the course
// created_at	DATETIME	Timestamp when the course was created
// updated_at	DATETIME	Timestamp when the course was last updated
// credits	INT	Number of credits for the course
// description	TEXT	Detailed description of the course
// status	VARCHAR	Status (active/inactive)
import { IsString, IsDate, IsNumber } from 'class-validator';
export class CreateCourseDto {
  courseName: string;
  @IsString()
  courseCode: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
  @IsNumber()
  credits: number;
  @IsString()
  description: string;
  @IsString()
  status: string;
}
