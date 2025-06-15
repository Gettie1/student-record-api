import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class CreateReportDto {
  @ApiProperty({
    description: 'Unique identifier for the report',
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  student_id: string;
  @ApiProperty({
    description: 'Unique identifier for the course',
    example: 101,
  })
  @IsString()
  @IsNotEmpty()
  course_id: string;
  @ApiProperty({
    description: 'Generated report data in JSON format',
    example: '{"grades": {"math": "A", "science": "B"}}',
  })
  @IsString()
  @IsNotEmpty()
  reportContent: string;
  @ApiProperty({
    description: 'Date of report generation in ISO format',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  report_date: string; // ISO date string
}
