import { CourseEnrollment } from 'src/course-enrollments/entities/course-enrollment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Registration } from 'src/registrations/entities/registration.entity';
import { Report } from 'src/reports/entities/report.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOfBirth: Date;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollmentDate: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  profilePicture: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.student)
  @JoinColumn()
  profile: Relation<Profile>;
  @OneToMany(() => Registration, (registration) => registration.student)
  registrations: Registration[];
  @OneToMany(
    () => CourseEnrollment,
    (courseEnrollment) => courseEnrollment.student,
  )
  courseEnrollments: CourseEnrollment[];
  @OneToMany(() => Feedback, (feedback) => feedback.student)
  feedbacks: Feedback[];

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  courses: Relation<Course[]>;
  @ManyToMany(() => Report, (report) => report.students)
  reports: Report[];
}
