import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Course])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
