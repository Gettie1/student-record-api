import { Injectable, NotFoundException } from '@nestjs/common';
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
    // Ensure CreateCourseDto and Course entity have a 'name' property
    const existingCourse = await this.courseRepository.findOne({
      where: { courseName: createCourseDto.courseName },
      relations: ['students'],
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

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id: id.toString() },
      relations: ['students'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOne({
      where: { id: id.toString() },
      relations: ['students'],
    });
    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }
    // Update the course with the new data
    Object.assign(course, updateCourseDto);
    return this.courseRepository.save(course);
  }

  remove(id: number) {
    return this.courseRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new Error(`Course with ID ${id} not found`);
      }
      return `Course with ID ${id} has been removed successfully`;
    });
  }
}
