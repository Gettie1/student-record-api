import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { CourseEnrollment } from 'src/course-enrollments/entities/course-enrollment.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Course, Student, CourseEnrollment, Profile]),
  ], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [CoursesController],
  providers: [CoursesService, RolesGuard],
})
export class CoursesModule {}
