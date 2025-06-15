import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, IsDate } from 'class-validator';
export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Unique identifier for the user providing feedback',
    example: 1,
  })
  @IsString()
  user_id: string; // Assuming user_id is a string, adjust if it's a number
  @ApiProperty({
    description: 'Unique identifier for the subject being reviewed',
    example: 101,
  })
  @IsString()
  subjectId: string;
  @ApiProperty({
    description: 'Detailed feedback provided by the user',
    example: 'The course content was very informative and well-structured.',
  })
  @IsString()
  feedback: string;
  @ApiProperty({
    description: 'Rating given by the user, from 1 to 5',
    example: 4,
  })
  @IsInt()
  rating: string;
  @ApiProperty({
    description: 'Timestamp of when the feedback was submitted',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  timestamp: string;
  @ApiProperty({
    description: 'Additional comments or suggestions from the user',
    example: 'I would appreciate more interactive sessions.',
  })
  @IsOptional()
  @IsString()
  additional_comments?: string;
}
