import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Student, Course, Profile]),
  ],
  providers: [StudentService, RolesGuard],
  controllers: [StudentController],
})
export class StudentModule {}
