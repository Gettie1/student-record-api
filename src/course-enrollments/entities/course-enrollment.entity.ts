import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CourseEnrollment {
  student_id: number;

  @PrimaryGeneratedColumn()
  course_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enroll_date: Date;

  @Column()
  grade?: string;

  @Column()
  status?: string;
}
