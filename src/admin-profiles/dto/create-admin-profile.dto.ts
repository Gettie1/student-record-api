// //admin_id	INT	Foreign Key referencing admins
// first_name	VARCHAR	Admin's first name
// last_name	VARCHAR	Admin's last name
// phone_number	VARCHAR	Admin's phone number
// address	TEXT	Admin's residential address
// profile_picture	VARCHAR	Path to the admin's profile picture
import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateAdminProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @IsString()
  address: string;
  @IsString()
  profilePicture: string;
}
