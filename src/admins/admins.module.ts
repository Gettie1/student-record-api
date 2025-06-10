import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Admin, Profile])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [AdminsController],
  providers: [AdminsService, RolesGuard],
})
export class AdminsModule {}
