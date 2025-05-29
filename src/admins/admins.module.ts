import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Admin, AdminProfile])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
