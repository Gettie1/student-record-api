import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  action: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column()
  entity_affected?: string;

  @Column()
  ip_address?: string;
}
