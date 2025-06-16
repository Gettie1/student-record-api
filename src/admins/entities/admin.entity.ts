import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { AdminLogin } from 'src/admin-logins/entities/admin-login.entity';
@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastLogin: Date;
  @Column({ default: false })
  isSuperAdmin: boolean;

  @OneToOne(() => Profile, (profile) => profile.admin, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Relation<Profile>;
  @OneToMany(() => AdminLogin, (adminLogin) => adminLogin.admin, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  adminLogins: Relation<AdminLogin[]>;
}
