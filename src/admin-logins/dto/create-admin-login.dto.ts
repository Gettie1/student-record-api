// login_id	INT	Primary Key, auto-incremented
// admin_id	INT	Foreign Key referencing admins
// login_time	DATETIME	Time of login
// logout_time	DATETIME	Time of logout
import { ApiProperty } from '@nestjs/swagger';
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
  @IsDate()
  login_time: Date;
  @ApiProperty({
    description: 'Timestamp of the admin logout',
    example: '2023-10-01T12:30:00Z',
  })
  @IsOptional()
  @IsDate()
  logout_time?: Date;
}
