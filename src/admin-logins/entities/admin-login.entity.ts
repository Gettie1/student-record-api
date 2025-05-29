import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class AdminLogin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  login_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  logout_time?: Date;
}
