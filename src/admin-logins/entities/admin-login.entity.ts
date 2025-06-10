import { Admin } from 'src/admins/entities/admin.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  Relation,
} from 'typeorm';
@Entity()
export class AdminLogin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  login_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  logout_time?: Date;
  @ManyToOne(() => Admin, (admin) => admin.adminLogins, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  admin: Relation<Admin>;
}
