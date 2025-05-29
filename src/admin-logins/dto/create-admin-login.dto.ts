// login_id	INT	Primary Key, auto-incremented
// admin_id	INT	Foreign Key referencing admins
// login_time	DATETIME	Time of login
// logout_time	DATETIME	Time of logout
import { IsInt, IsOptional, IsDate } from 'class-validator';
export class CreateAdminLoginDto {
  @IsInt()
  admin_id: number;

  @IsDate()
  login_time: Date;

  @IsOptional()
  @IsDate()
  logout_time?: Date;
}
