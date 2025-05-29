// session_id	INT	Primary Key, auto-incremented
// session_name	VARCHAR	Name/Year of the academic session
// start_date	DATE	Start date of the session
// end_date	DATE	End date of the session
// status	VARCHAR	Status (active/inactive)
import { IsString, IsDate } from 'class-validator';
export class CreateSessionDto {
  @IsString()
  sessionName: string;
  @IsDate()
  startDate: Date;
  @IsDate()
  endDate: Date;
  @IsString()
  status: string;

  constructor(
    sessionName: string,
    startDate: Date,
    endDate: Date,
    status: string,
  ) {
    this.sessionName = sessionName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
