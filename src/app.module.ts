import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { AdminsModule } from './admins/admins.module';
import { CoursesModule } from './courses/courses.module';
import { SubjectsModule } from './subjects/subjects.module';
import { SessionsModule } from './sessions/sessions.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { AdminLoginsModule } from './admin-logins/admin-logins.module';
import { CourseEnrollmentsModule } from './course-enrollments/course-enrollments.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { ReportsModule } from './reports/reports.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { CacheMeModule } from './cache-me/cache-me.module';
import * as redisStore from 'cache-manager-redis-store';
// import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import Keyv from 'keyv';
import { LoggerMiddleware } from './logger.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    StudentModule,
    AdminsModule,
    CoursesModule,
    SubjectsModule,
    SessionsModule,
    RegistrationsModule,
    AdminLoginsModule,
    CourseEnrollmentsModule,
    FeedbacksModule,
    ReportsModule,
    CacheMeModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        url: process.env.REDIS_URL,
        ttl: 60 * 60, // Default TTL of 1 hour
      }),
    }),
    // AuthModule,
    ProfilesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        'student',
        'admins',
        'admin-profiles',
        'courses',
        'subjects',
        'sessions',
        'registrations',
        'admin-logins',
        'password-changes',
        'course-enrollments',
        'audit-logs',
        'feedbacks',
        'reports',
        'cache-me',
      );
  }
  // This method can be used to configure middleware or other global settings
}
