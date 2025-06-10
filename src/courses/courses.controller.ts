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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtGuard } from '../auth/guards/at.guard'; // Adjust the path as needed
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
@ApiTags('Courses') // 👈 this is used by Swagger to group the endpoints
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // 👈 actual runtime protection
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
