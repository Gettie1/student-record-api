import { Module } from '@nestjs/common';
import { CourseEnrollmentsService } from './course-enrollments.service';
import { CourseEnrollmentsController } from './course-enrollments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CourseEnrollment])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [CourseEnrollmentsController],
  providers: [CourseEnrollmentsService],
})
export class CourseEnrollmentsModule {}
