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
  async create(createStudentDto: CreateStudentDto) {
    const dto = {
      ...createStudentDto,
      dateOfBirth: createStudentDto.dateOfBirth
        ? createStudentDto.dateOfBirth.toISOString()
        : undefined,
      enrollmentDate: createStudentDto.enrollmentDate
        ? createStudentDto.enrollmentDate.toISOString()
        : undefined,
    };
    const student = this.studentRepository.create(dto);
    return this.studentRepository.save(student);
  }

  findAll(search?: string) {
    if (search) {
      return this.studentRepository.find({
        where: [
          { email: search },
          {
            phoneNumber: search,
          },
          {
            enrollmentDate: isNaN(Date.parse(search))
              ? undefined
              : new Date(search).toISOString(),
          },
          { status: search },
          { country: search },
          { state: search },
          { city: search },
          { profilePicture: search },
        ],
      });
    }
    // If no search term is provided, return all students
    return this.studentRepository.find();
  }
  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
    });
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return student;
  }

  async findRegistrations(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
      relations: ['registrations'],
    });
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return student;
  }
  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateStudentDto> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
    });
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    // Update the student entity with the new data
    Object.assign(student, updateStudentDto);
    // Save the updated student entity to the database
    await this.studentRepository.save(student);
    return updateStudentDto;
  }
  async remove(id: number): Promise<string> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
    });
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    await this.studentRepository.remove(student);
    const enrollmentDate = student.enrollmentDate;
    if (!enrollmentDate) {
      throw new Error(`Enrollment date for student with ID ${id} not found`);
    }

    return `This action removes a #${id} student`;
  }
}
