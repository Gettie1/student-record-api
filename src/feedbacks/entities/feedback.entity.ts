import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  subject_id: number;

  @Column()
  feedback: string;

  @Column()
  rating: number;

  @Column()
  timestamp: Date;

  @Column()
  additional_comments?: string;
}
