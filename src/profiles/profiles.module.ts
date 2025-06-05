import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity'; // Import the Profile entity

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Profile])], // Import the necessary modules, e.g., TypeOrmModule for database access
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
