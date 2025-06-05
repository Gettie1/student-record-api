import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  Relation,
  OneToOne,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;
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
}
