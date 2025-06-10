// login_id	INT	Primary Key, auto-incremented
// admin_id	INT	Foreign Key referencing admins
// login_time	DATETIME	Time of login
// logout_time	DATETIME	Time of logout
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsDate } from 'class-validator';
export class CreateAdminLoginDto {
  @ApiProperty({
    description: 'Unique identifier for the admin login',
    example: 1,
  })
  @IsInt()
  admin_id: number;
  @ApiProperty({
    description: 'Timestamp of the admin login',
    example: '2023-10-01T12:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  login_time: string;
  @ApiProperty({
    description: 'Timestamp of the admin logout',
    example: '2023-10-01T12:30:00Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  logout_time?: string;
}
