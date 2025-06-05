import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Relation,
} from 'typeorm';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { Admin } from 'src/admins/entities/admin.entity';

export enum Role {
  STUDENT = 'student',
  ADMIN = 'admin',
  GUEST = 'guest',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.GUEST })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'text', nullable: true, default: null })
  hashedRefreshToken: string | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Student, (student) => student.profile)
  student: Relation<Student>;

  @OneToOne(() => Admin, (admin) => admin.profile)
  admin: Relation<Admin>;
}
