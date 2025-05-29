import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  reportId: string;
  @Column({ nullable: false })
  reportContent: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
