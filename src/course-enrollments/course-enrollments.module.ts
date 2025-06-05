import { Module } from '@nestjs/common';
import { CourseEnrollmentsService } from './course-enrollments.service';
import { CourseEnrollmentsController } from './course-enrollments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([CourseEnrollment, Course, Student]),
  ], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [CourseEnrollmentsController],
  providers: [CourseEnrollmentsService],
})
export class CourseEnrollmentsModule {}
