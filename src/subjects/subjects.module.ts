import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Subject, Course])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
