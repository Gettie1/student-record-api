import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Registration, Student])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
