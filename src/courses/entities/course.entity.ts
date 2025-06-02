// import { isNotEmpty } from "class-validator";
import { CourseEnrollment } from 'src/course-enrollments/entities/course-enrollment.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  courseId: string;
  @Column({ nullable: false, unique: true })
  courseName: string;
  @Column({ unique: true, nullable: false })
  courseCode: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  // @isNotEmpty()
  updatedAt: Date;
  @Column({ nullable: false })
  credits: number;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: false })
  // @isNotEmpty()
  status: string;

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
  @OneToMany(
    () => CourseEnrollment,
    (courseEnrollment) => courseEnrollment.course,
  )
  courseEnrollments: CourseEnrollment[]; // Assuming a course can have multiple enrollments
}
