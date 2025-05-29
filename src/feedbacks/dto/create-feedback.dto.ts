// feedback_id	INT	Primary Key, auto-incremented
// user_id	INT	User ID (can be admin or student)
// subject_id	INT	Foreign Key referencing subjects
// feedback	TEXT	Detailed feedback
// rating	INT	Rating from 1 to 5
// timestamp	DATETIME	Date and time of feedback submission
import { IsInt, IsString, IsOptional, IsDate } from 'class-validator';
export class CreateFeedbackDto {
  @IsInt()
  user_id: number;

  @IsInt()
  subject_id: number;

  @IsString()
  feedback: string;

  @IsInt()
  rating: number;

  @IsDate()
  timestamp: Date;

  @IsOptional()
  @IsString()
  additional_comments?: string;
}
