import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Feedback, Student, Profile]),
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, RolesGuard],
})
export class FeedbacksModule {}
