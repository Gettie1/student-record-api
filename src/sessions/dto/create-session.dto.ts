// session_id	INT	Primary Key, auto-incremented
// session_name	VARCHAR	Name/Year of the academic session
// start_date	DATE	Start date of the session
// end_date	DATE	End date of the session
// status	VARCHAR	Status (active/inactive)
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
export class CreateSessionDto {
  @ApiProperty({
    description: 'Name of the academic session',
    example: '2023-2024 Academic Year',
  })
  @IsString()
  sessionName: string;
  @ApiProperty({
    description: 'Start date of the academic session',
    example: '2023-08-01',
  })
  @Type(() => Date)
  @IsDate()
  startDate: string;
  @ApiProperty({
    description: 'End date of the academic session',
    example: '2024-05-31',
  })
  @Type(() => Date)
  @IsDate()
  endDate: string;
  @ApiProperty({
    description: 'Status of the academic session',
    example: 'active',
  })
  @IsString()
  status: string;
  @ApiProperty({
    description: 'ID of the subject associated with the session',
    example: 1,
  })
  @ApiProperty({
    description: 'Unique identifier for the subject',
    example: 'subject12345',
  })
  @IsString()
  subjectId: string;
}
