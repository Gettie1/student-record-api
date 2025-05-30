import { Student } from 'src/student/entities/student.entity/student.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @ManyToOne(() => Student, (student) => student.courseEnrollments)
  student: Student; // Assuming a course enrollment is linked to a single student
}
