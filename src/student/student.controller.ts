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
// import { Query } from 'typeorm/driver/Query';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
  // create(@Body() body: CreateStudentDto) {
  //   console.log('dateOfBirth:', body.dateOfBirth, typeof body.dateOfBirth);
  @Get()
  findAll(@Query('search') search?: string) {
    return this.studentService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Get(':id/registrations')
  findRegistrations(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findRegistrations(id);
  }
  @Get(':id/courses')
  findCourses(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findCourses(id);
  }
  @Get(':id/profiles')
  findProfile(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findProfile(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.remove(id);
  }
}
