//subject_id	INT	Primary Key, auto-incremented
// subject_name	VARCHAR	Name of the subject
// course_id	INT	Foreign Key referencing courses
// created_at	DATETIME	Timestamp when the subject was created
// updated_at	DATETIME	Timestamp when the subject was updated
// credits	INT	Credits assigned to the subject
import { IsString, IsDate, IsNumber } from 'class-validator';
export class CreateSubjectDto {
  @IsString()
  subjectName: string;
  @IsNumber()
  courseId: number; // Foreign Key referencing courses
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
  @IsNumber()
  credits: number;
}
