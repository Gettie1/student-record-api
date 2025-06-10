import { Module } from '@nestjs/common';
import { CourseEnrollmentsService } from './course-enrollments.service';
import { CourseEnrollmentsController } from './course-enrollments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Profile } from 'src/profiles/entities/profile.entity';
// import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([CourseEnrollment, Course, Student, Profile]),
  ], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [CourseEnrollmentsController],
  providers: [CourseEnrollmentsService, RolesGuard],
})
export class CourseEnrollmentsModule {}
