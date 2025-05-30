import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
  OneToOne,
} from 'typeorm';
import { AdminProfile } from '../../admin-profiles/entities/admin-profile.entity';
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

  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.admin, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  adminProfile: Relation<AdminProfile>;
}
