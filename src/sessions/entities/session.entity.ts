import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Session {
  // import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endTime: Date;
  @Column({ type: 'text', nullable: true })
  status: string; // e.g., 'scheduled', 'completed', 'cancelled'
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
