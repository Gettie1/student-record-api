import { Module } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { AdminProfilesController } from './admin-profiles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProfile } from './entities/admin-profile.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AdminProfile])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [AdminProfilesController],
  providers: [AdminProfilesService],
})
export class AdminProfilesModule {}
