import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Report])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
