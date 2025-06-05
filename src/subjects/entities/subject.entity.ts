import { Course } from 'src/courses/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
