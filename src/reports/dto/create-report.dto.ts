// report_id	INT	Primary Key, auto-incremented
// student_id	INT	Foreign Key referencing students
// course_id	INT	Foreign Key referencing courses
// report_data	TEXT	Generated report data
// report_date	DATETIME	Date of report generation
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class CreateReportDto {
  @IsInt()
  @IsNotEmpty()
  student_id: number;

  @IsInt()
  @IsNotEmpty()
  course_id: number;

  @IsString()
  @IsNotEmpty()
  report_data: string;

  @IsString()
  @IsNotEmpty()
  report_date: string; // ISO date string
}
