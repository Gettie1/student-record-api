import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class PasswordChange {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({})
  old_password: string;

  @Column()
  new_password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  change_date: Date;
}
