import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../auth/guards/at.guard'; // Adjust the path as needed
// import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { CacheInterceptor } from '@nestjs/cache-manager'; // Uncomment if you want to use caching
import { UseInterceptors } from '@nestjs/common'; // Import UseInterceptors for caching responses
// import { Public } from 'src/auth/decorators/public.decorator';
// import { Query } from 'typeorm/driver/Query';
@UseInterceptors(CacheInterceptor) // 👈 this is used to cache the responses, uncomment if needed
@ApiTags('Students') // 👈 this is used by Swagger to group the endpoints
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // 👈 actual runtime protection
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // @Public() // 👈 this is a custom decorator to allow public access to this route
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
  // create(@Body() body: CreateStudentDto) {
  //   console.log('dateOfBirth:', body.dateOfBirth, typeof body.dateOfBirth);
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN rol  e
  @Get()
  findAll(@Query('search') search?: string) {
    return this.studentService.findAll(search);
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }
  @Roles(Role.ADMIN, Role.STUDENT) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id/registrations')
  findRegistrations(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findRegistrations(id);
  }
  @Roles(Role.ADMIN, Role.STUDENT) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id/courses')
  findCourses(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findCourses(id);
  }
  @Roles(Role.ADMIN, Role.STUDENT) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id/profiles')
  findProfile(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findProfile(id);
  }
  @Roles(Role.ADMIN, Role.STUDENT) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.remove(id);
  }
}
