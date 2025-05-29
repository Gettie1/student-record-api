// log_id	INT	Primary Key, auto-incremented
// user_id	INT	User ID (can be admin or student)
// action	TEXT	Description of the action performed
// timestamp	DATETIME	Time the action occurred
// entity_affected	VARCHAR	Entity that was affected (e.g., student, course)
// ip_address	VARCHAR	IP address from which the action was performed
import { IsInt, IsString, IsOptional, IsDate } from 'class-validator';
export class CreateAuditLogDto {
  @IsInt()
  user_id: number;

  @IsString()
  action: string;

  @IsDate()
  timestamp: Date;

  @IsOptional()
  @IsString()
  entity_affected?: string;

  @IsOptional()
  @IsString()
  ip_address?: string;
}
