//
import { IsString, IsDate, IsNotEmpty } from 'class-validator';
export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;
  @IsString()
  @IsNotEmpty()
  courseId: string;
  @IsString()
  @IsNotEmpty()
  sessionId: string;
  @IsString()
  @IsNotEmpty()
  subjectId: string;
  @IsDate()
  @IsNotEmpty()
  registrationDate: Date;
  @IsString()
  @IsNotEmpty()
  status: string; // e.g., 'pending', 'approved', 'rejected'
}
