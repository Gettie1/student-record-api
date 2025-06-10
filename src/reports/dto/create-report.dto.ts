// report_id	INT	Primary Key, auto-incremented
// student_id	INT	Foreign Key referencing students
// course_id	INT	Foreign Key referencing courses
// report_data	TEXT	Generated report data
// report_date	DATETIME	Date of report generation
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class CreateReportDto {
  @ApiProperty({
    description: 'Unique identifier for the report',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  student_id: number;
  @ApiProperty({
    description: 'Unique identifier for the course',
    example: 101,
  })
  @IsInt()
  @IsNotEmpty()
  course_id: number;
  @ApiProperty({
    description: 'Generated report data in JSON format',
    example: '{"grades": {"math": "A", "science": "B"}}',
  })
  @IsString()
  @IsNotEmpty()
  report_data: string;
  @ApiProperty({
    description: 'Date of report generation in ISO format',
    example: '2023-10-01T12:00:00Z',
  })
  @IsString()
  @IsNotEmpty()
  report_date: string; // ISO date string
}
