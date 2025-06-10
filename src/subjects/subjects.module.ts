import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Subject, Course, Session, Profile]),
  ], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [SubjectsController],
  providers: [SubjectsService, RolesGuard],
})
export class SubjectsModule {}
