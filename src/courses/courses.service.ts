import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { CourseEnrollment } from 'src/course-enrollments/entities/course-enrollment.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(CourseEnrollment)
    private readonly courseEnrollmentRepository: Repository<CourseEnrollment>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const existingCourse = await this.courseRepository.findOne({
      where: { courseName: createCourseDto.courseName },
    });
    if (existingCourse) {
      throw new Error(
        `Course with name ${createCourseDto.courseName} already exists`,
      );
    }
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAll() {
    const courses = await this.courseRepository.find({
      relations: ['students'],
    });
    return courses;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return updateCourseDto;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
