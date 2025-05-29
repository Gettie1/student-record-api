import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';
// import { Query } from 'typeorm/driver/Query';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  // create(@Body() createStudentDto: CreateStudentDto) {
  //   return this.studentService.create(createStudentDto);
  // }
  create(@Body() body: CreateStudentDto) {
    console.log('dateOfBirth:', body.dateOfBirth, typeof body.dateOfBirth);
  }
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.studentService.findByEmail(email);
  }
  @Get(':phoneNumber')
  findByPhoneNumber(@Param('phoneNumber') phoneNumber: number) {
    return this.studentService.findByPhoneNumber(phoneNumber);
  }
  @Get(':enrollmentDate')
  findByEnrollmentDate(@Param('enrollmentDate') enrollmentDate: Date) {
    return this.studentService.findByEnrollmentDate(enrollmentDate);
  }
  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.studentService.findByStatus(status);
  }
  @Get('country/:country')
  findByCountry(@Param('country') country: string) {
    return this.studentService.findByCountry(country);
  }
  @Get('state/:state')
  findByState(@Param('state') state: string) {
    return this.studentService.findByState(state);
  }
  @Get('city/:city')
  findByCity(@Param('city') city: string) {
    return this.studentService.findByCity(city);
  }
  @Get('profile-picture/:profilePicture')
  findByProfilePicture(@Param('profilePicture') profilePicture: string) {
    return this.studentService.findByProfilePicture(profilePicture);
  }
}
