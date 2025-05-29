import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class Registration {
  @PrimaryColumn()
  studentId: string;
  @Column()
  courseId: string;
  @Column()
  sessionId: string;
  @Column()
  subjectId: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;
  @Column()
  status: string; // e.g., 'pending', 'approved', 'rejected'
}
