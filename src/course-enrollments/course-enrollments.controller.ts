import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseEnrollmentsService } from './course-enrollments.service';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards/at.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { CacheInterceptor } from '@nestjs/cache-manager'; // Uncomment if you want to use caching
import { UseInterceptors } from '@nestjs/common'; // Import UseInterceptors for caching responses
@UseInterceptors(CacheInterceptor) // 👈 this is used to cache the responses, uncomment if needed
@ApiTags('CourseEnrollments') // 👈 this is used by Swagger to group the endpoints
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // 👈 actual runtime protection
@Controller('course-enrollments')
export class CourseEnrollmentsController {
  constructor(
    private readonly courseEnrollmentsService: CourseEnrollmentsService,
  ) {}
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Post()
  create(@Body() createCourseEnrollmentDto: CreateCourseEnrollmentDto) {
    return this.courseEnrollmentsService.create(createCourseEnrollmentDto);
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get()
  findAll() {
    return this.courseEnrollmentsService.findAll();
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseEnrollmentsService.findOne(+id);
  }
  @Roles(Role.ADMIN, Role.STUDENT) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseEnrollmentDto: UpdateCourseEnrollmentDto,
  ) {
    return this.courseEnrollmentsService.update(+id, updateCourseEnrollmentDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseEnrollmentsService.remove(+id);
  }
}
