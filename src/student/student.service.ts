import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity/student.entity';
import { Course } from 'src/courses/entities/course.entity';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const { email, dateOfBirth, enrollmentDate } = createStudentDto;

    const existingStudent = await this.studentRepository.findOne({
      where: { email },
    });
    if (existingStudent) {
      throw new BadRequestException(
        `Student with email ${email} already exists`,
      );
    }

    const parsedDateOfBirth = new Date(dateOfBirth);
    const parsedEnrollmentDate = new Date(enrollmentDate);

    if (isNaN(parsedDateOfBirth.getTime())) {
      throw new BadRequestException('Invalid dateOfBirth format');
    }
    if (isNaN(parsedEnrollmentDate.getTime())) {
      throw new BadRequestException('Invalid enrollmentDate format');
    }

    const student = this.studentRepository.create({
      ...createStudentDto,
      dateOfBirth: parsedDateOfBirth.toISOString(),
      enrollmentDate: parsedEnrollmentDate.toISOString(),
    });

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
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async findRegistrations(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
      relations: ['registrations'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
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
  async findCourses(id: number): Promise<Student> {
    const enrollStudentInCourses = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
      relations: ['courseEnrollments', 'courseEnrollments.course'],
    });
    if (!enrollStudentInCourses) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return enrollStudentInCourses;
  }
  async findFeedbacks(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
      relations: ['feedbacks'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }
  async remove(id: number): Promise<string> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id.toString() },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.studentRepository.remove(student);
    return `Student with ID ${id} has been removed successfully`;
  }
}
