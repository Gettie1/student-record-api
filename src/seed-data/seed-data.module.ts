import { Logger, Module } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';
import { SeedDataController } from './seed-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Registration } from 'src/registrations/entities/registration.entity';
import { CourseEnrollment } from 'src/course-enrollments/entities/course-enrollment.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Course,
      Registration,
      CourseEnrollment,
      Profile,
    ]),
  ], // Add your entities here if needed
  controllers: [SeedDataController],
  providers: [SeedDataService, Logger],
})
export class SeedDataModule {}
