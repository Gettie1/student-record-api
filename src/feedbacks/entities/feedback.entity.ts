import { Student } from 'src/student/entities/student.entity/student.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  subject_id: number;

  @Column()
  feedback: string;

  @Column()
  rating: number;

  @Column()
  timestamp: Date;

  @Column()
  additional_comments?: string;

  @ManyToOne(() => Student, (student) => student.feedbacks)
  student: Student; // Each feedback is associated with a single student
}
