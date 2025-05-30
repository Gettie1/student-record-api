import { Student } from 'src/student/entities/student.entity/student.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
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
  @ManyToOne(() => Student, (student) => student.registrations)
  student: Student; // Establishing a many-to-one relationship with the Student entity
}
