// change_id	INT	Primary Key, auto-incremented
// admin_id	INT	Foreign Key referencing admins
// old_password	VARCHAR	Admin's old password (hashed)
// new_password	VARCHAR	Admin's new password (hashed)
// change_date	DATETIME	Date and time of password change
import { IsInt, IsString, IsDate } from 'class-validator';
export class CreatePasswordChangeDto {
  @IsInt()
  admin_id: number;

  @IsString()
  old_password: string;

  @IsString()
  new_password: string;

  @IsDate()
  change_date: Date;
}
