import { Subject } from 'src/subjects/entities/subject.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Session {
  // import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  sessionName: string; // Name of the session
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
  @ManyToOne(() => Subject, (subject) => subject.sessions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  subject: Subject; // Assuming you have a Subject entity related to Session
}
