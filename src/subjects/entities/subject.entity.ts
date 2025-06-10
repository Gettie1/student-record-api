import { Course } from 'src/courses/entities/course.entity';
import { Session } from 'src/sessions/entities/session.entity'; // Update the import to your actual Session entity path
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subjectId: string;
  @Column()
  subjectName: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  credits: number;
  @ManyToOne(() => Course, (course) => course.subjects, {
    onDelete: 'CASCADE',
  })
  course: Course;
  @OneToMany(() => Session, (session) => session.subject, {
    onDelete: 'CASCADE',
  })
  sessions: Session[]; // Assuming you have a Session entity related to Subject
}
