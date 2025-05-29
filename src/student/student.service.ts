import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity/student.entity';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    // Example usage: return the received DTO
    return createStudentDto;
  }

  findAll() {
    return `This action returns all students`;
  }
  findOne(id: number) {
    return `This action returns a #${id} student`;
  }
  update(id: number, updateStudentDto: UpdateStudentDto) {
    return updateStudentDto;
  }
  remove(id: number) {
    return `This action removes a #${id} student`;
  }
  findByEmail(email: string) {
    return `This action returns a student with email ${email}`;
  }
  findByPhoneNumber(phoneNumber: number) {
    return `This action returns a student with phone number ${phoneNumber}`;
  }
  findByEnrollmentDate(enrollmentDate: Date) {
    return `This action returns a student with enrollment date ${enrollmentDate.toISOString()}`;
  }
  findByStatus(status: string) {
    return `This action returns a student with status ${status}`;
  }
  findByCountry(country: string) {
    return `This action returns a student from country ${country}`;
  }
  findByState(state: string) {
    return `This action returns a student from state ${state}`;
  }
  findByCity(city: string) {
    return `This action returns a student from city ${city}`;
  }
  findByProfilePicture(profilePicture: string) {
    return `This action returns a student with profile picture ${profilePicture}`;
  }
}
