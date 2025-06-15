import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { allExceptionsFilter } from './all-exceptions.filter';
import { AtGuard } from './auth/guards/at.guard';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // Use Helmet for security headers
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type, Accept, Authorization, X-Requested-With, X-API-KEY',
  });
  app.setGlobalPrefix('api/v1'); // Set a global prefix for all routes
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AtGuard(reflector)); // 👈 this is key
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new allExceptionsFilter(httpAdapter));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Student Records Management API')
    .setDescription(
      `
The **Student Records Management System API** enables both administrators and students to perform academic and administrative operations seamlessly.

### ✨ Key Features
- User authentication and authorization (Admin, Student)
- Course, subject and session management
- Student registration and course enrollments

### 👥 Roles & Access
- **Admin**: Manage students, courses, sessions, subjects and view reports
- **Student**: Register for courses, view subjects, and give feedback

### 🌐 Base URLs
- **Production**: \`https://student.example.com/api/v1\`
- **Development**: \`http://localhost:${port}/api/v1\`

### 🔐 Authentication
- Use the **Bearer Token** (JWT) via the \`Authorization\` header
`,
    )

    .setVersion('1.0')
    .addTag('Students', 'Student record management endpoint')
    .addTag('Courses', 'Course management endpoint')
    .addTag('CourseEnrollments', 'Course enrollment management endpoint')
    .addTag('Auth', 'Authentication and authorization endpoint')
    .addTag('Registrations', 'User registration endpoint')
    .addTag('Sessions', 'Academic session management endpoint')
    .addTag('Feedbacks', 'Feedback management endpoint')
    .addTag('Profiles', 'Profile management endpoint')
    .addTag('Admins', 'Admin management endpoint')
    .addTag('Subjects', 'Subject management endpoint')
    .addTag('Reports', 'Report generation endpoint')
    .addTag('Admin Logins', 'Admin login endpoint')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // Name of the security scheme
    )
    // .addApiKey(
    //   {
    //     type: 'apiKey',
    //     name: 'X-API-KEY',
    //     in: 'header',
    //   },
    //   'api-key', // Name of the security scheme
    // )
    .addServer(`http://localhost:4510`, 'Local development server')
    .addServer(`https://student.example.com`, 'Production server')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    jsonDocumentUrl: 'api/api-json',
    yamlDocumentUrl: 'api/api-yaml',
    swaggerOptions: {
      persistAuthorization: true, // This allows Swagger UI to remember the token
      tagsSorter: 'alpha', // Sort tags alphabetically
      operationsSorter: 'alpha', // Sort operations alphabetically
      docExpansion: 'none', // Start with all sections collapsed
      filter: true, // Enable filtering of endpoints
      showRequestDuration: true, // Show request duration in milliseconds
      tryItOutEnabled: true, // Enable the "Try it out" feature
    },
    customCss: `
      .swagger-ui .topbar { display: none; }
      swagger-ui .info { margin-bottom: 20px; }
      `,
    customSiteTitle: 'Student Management API Documentation',
    customfavIcon:
      'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f393.png', // 🎓 graduation cap
  });
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
void bootstrap();
