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
// import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import Keyv from 'keyv';
import { LoggerMiddleware } from './logger.middleware';
import { ProfilesModule } from './profiles/profiles.module';
// import { SeedDataModule } from './seed-data/seed-data.module';
import { LogsModule } from './app.logs/logs.module';
// import { AuthGuard } from '@nestjs/passport';
import { AtGuard } from './auth/guards/at.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';

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
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          ttl: 30000,
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 30000, lruSize: 5000 }),
            }),
            createKeyv(configService.getOrThrow<string>('REDIS_URL')),
          ],
          logger: true,
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow<number>('THROTTLE_TTL'),
          limit: config.getOrThrow<number>('THROTTLE_LIMIT'),
          ignoreUserAgents: [/^PostmanRuntime\//, /^curl\//],
        },
      ],
    }),
    AuthModule,
    ProfilesModule,
    // SeedDataModule,
    LogsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor, // global cache interceptor
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard, // global guard for access tokens for all routes
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // global throttling guard
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply the LoggerMiddleware to all routes
  }
}
