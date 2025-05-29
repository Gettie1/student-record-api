import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { AdminsModule } from './admins/admins.module';
import { AdminProfilesModule } from './admin-profiles/admin-profiles.module';
import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { SessionsModule } from './sessions/sessions.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { AdminLoginsModule } from './admin-logins/admin-logins.module';
import { PasswordChangesModule } from './password-changes/password-changes.module';
import { CourseEnrollmentsModule } from './course-enrollments/course-enrollments.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    StudentModule,
    AdminsModule,
    AdminProfilesModule,
    CoursesModule,
    SubjectsModule,
    SessionsModule,
    RegistrationsModule,
    AdminLoginsModule,
    PasswordChangesModule,
    CourseEnrollmentsModule,
    AuditLogsModule,
    FeedbacksModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
