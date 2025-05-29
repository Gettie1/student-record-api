import { Entity, Column, OneToOne, PrimaryColumn, Relation } from 'typeorm';
// Update the import path below if the location is different, or create the file if it doesn't exist.
import { Admin } from '../../admins/entities/admin.entity';
export enum Role {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest',
  SUPPORT = 'support',
  MANAGER = 'manager',
}
@Entity('admin_profiles')
export class AdminProfile {
  @PrimaryColumn()
  admin_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: string;

  @Column({ type: 'enum', enum: Role, default: 'admin' })
  role: Role;

  @Column('text')
  address: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToOne(
    () => Admin,
    (admin: Admin): Admin['adminProfile'] => admin.adminProfile,
  )
  admin!: Relation<Admin>;
}
