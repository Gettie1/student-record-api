import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity/student.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Student])], // Add your entities here
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
