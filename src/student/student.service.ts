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
import { Profile } from 'src/profiles/entities/profile.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    // Check if the profile already exists
    const existingProfile = await this.profileRepository.findOne({
      where: { email: createStudentDto.email },
    });
    if (existingProfile) {
      throw new BadRequestException(
        `Profile with email ${createStudentDto.email} already exists`,
      );
    }
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

    await this.studentRepository.save(student);

    return this.studentRepository.find({
      where: { email: createStudentDto.email },
      relations: ['profile'],
    });
  }

  findAll(search?: string) {
    if (search) {
      return this.studentRepository.find({
        where: [
          { firstName: search },
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
      where: { id: id.toString() },
      relations: ['profile', 'registrations', 'courseEnrollments'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async findProfile(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: id.toString() },
      relations: ['profile'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async findRegistrations(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: id.toString() },
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
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: id.toString() },
    });
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    // Update the student entity with the new data
    Object.assign(student, updateStudentDto);
    // Save the updated student entity to the database
    return this.studentRepository.save(student);
  }
  async findCourses(id: number): Promise<Student> {
    const enrollStudentInCourses = await this.studentRepository.findOne({
      where: { id: id.toString() },
      relations: ['courseEnrollments', 'courseEnrollments.course'],
    });
    if (!enrollStudentInCourses) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return enrollStudentInCourses;
  }
  async findFeedbacks(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: id.toString() },
      relations: ['feedbacks'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }
  async remove(id: number): Promise<string> {
    const student = await this.studentRepository.findOne({
      where: { id: id.toString() },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.studentRepository.remove(student);
    return `Student with ID ${id} has been removed successfully`;
  }
  //many-to-many relationship with courses
  async enrollInCourse(id: number, course_id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: id.toString() },
      relations: ['courses'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    const course = await this.courseRepository.findOne({
      where: { id: course_id.toString() },
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${course_id} not found`);
    }

    // Check if the student is already enrolled in the course
    if (student.courses.some((c) => c.id === course.id)) {
      throw new BadRequestException(
        `Student with ID ${id} is already enrolled in course with ID ${course_id}`,
      );
    }

    student.courses.push(course);
    return this.studentRepository.save(student);
  }
  async unenrollFromCourse(
    studentId: number,
    courseId: number,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId.toString() },
      relations: ['courses'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const course = await this.courseRepository.findOne({
      where: { id: courseId.toString() },
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if the student is enrolled in the course
    if (!student.courses.some((c) => c.id === course.id)) {
      throw new BadRequestException(
        `Student with ID ${studentId} is not enrolled in course with ID ${courseId}`,
      );
    }

    student.courses = student.courses.filter((c) => c.id !== course.id);
    return this.studentRepository.save(student);
  }
}
