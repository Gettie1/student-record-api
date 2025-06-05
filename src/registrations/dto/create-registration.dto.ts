//
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  courseId: string;
  @IsString()
  @IsNotEmpty()
  sessionId: string;
  @IsString()
  @IsNotEmpty()
  subjectId: string;
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  registrationDate: Date; // ISO date string, e.g., '2023-10-01T12:00:00Z'
  @IsString()
  @IsNotEmpty()
  status: string; // e.g., 'pending', 'approved', 'rejected'
}
