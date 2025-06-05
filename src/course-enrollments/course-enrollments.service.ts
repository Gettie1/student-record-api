import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { Course } from '../courses/entities/course.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    @InjectRepository(CourseEnrollment)
    private courseEnrollmentsRepository: Repository<CourseEnrollment>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  async create(
    createCourseEnrollmentDto: CreateCourseEnrollmentDto,
  ): Promise<CourseEnrollment> {
    const student = await this.studentRepository.findOne({
      where: { id: String(createCourseEnrollmentDto.id) },
    });
    if (!student) {
      throw new Error('Student not found');
    }

    const course = await this.courseRepository.findOne({
      where: { id: String(createCourseEnrollmentDto.course_id) },
    });
    if (!course) {
      throw new Error('Course not found');
    }

    const courseEnrollment = this.courseEnrollmentsRepository.create({
      ...createCourseEnrollmentDto,
      student,
      course,
    });

    return this.courseEnrollmentsRepository.save(courseEnrollment);
  }

  async findAll() {
    const courseEnrollments = await this.courseEnrollmentsRepository.find({
      relations: ['student', 'course'], // Include relations to student and course
    });
    return courseEnrollments.map((enrollment) => ({
      ...enrollment,
      student: enrollment.student
        ? {
            id: enrollment.student.id,
            firstName: enrollment.student.firstName,
            lastName: enrollment.student.lastName,
          }
        : null,
      course: enrollment.course
        ? {
            id: enrollment.course.id,
            // Uncomment the following line if 'title' exists on Course entity
            // title: enrollment.course.title,
            // Uncomment the following line if 'description' exists on Course entity
            // description: enrollment.course.description,
          }
        : null,
    }));
  }

  async findOne(id: number) {
    const courseEnrollment = await this.courseEnrollmentsRepository.findOne({
      where: { course_id: id },
      relations: ['student', 'course'], // Include relations to student and course
    });
    if (!courseEnrollment) {
      throw new Error(`Course enrollment with ID ${id} not found`);
    }
    return {
      ...courseEnrollment,
      student: courseEnrollment.student
        ? {
            id: courseEnrollment.student.id,
            firstName: courseEnrollment.student.firstName,
            lastName: courseEnrollment.student.lastName,
          }
        : null,
      course: courseEnrollment.course
        ? {
            id: courseEnrollment.course.id,
            // Uncomment the following line if 'title' exists on Course entity
            // title: courseEnrollment.course.title,
            // Uncomment the following line if 'description' exists on Course entity
            // description: courseEnrollment.course.description,
          }
        : null,
    };
  }

  async update(
    id: number,
    updateCourseEnrollmentDto: UpdateCourseEnrollmentDto,
  ) {
    const courseEnrollment = await this.courseEnrollmentsRepository.findOne({
      where: { course_id: id },
      relations: ['student', 'course'], // Include relations to student and course
    });
    if (!courseEnrollment) {
      throw new Error(`Course enrollment with ID ${id} not found`);
    }

    // Update the course enrollment with the new data
    Object.assign(courseEnrollment, updateCourseEnrollmentDto);

    // If student or course is being updated, fetch them again
    if (updateCourseEnrollmentDto.id) {
      const student = await this.studentRepository.findOne({
        where: { id: String(updateCourseEnrollmentDto.id) },
      });
      if (!student) {
        throw new Error('Student not found');
      }
      courseEnrollment.student = student;
    }

    if (updateCourseEnrollmentDto.course_id) {
      const course = await this.courseRepository.findOne({
        where: { id: String(updateCourseEnrollmentDto.course_id) },
      });
      if (!course) {
        throw new Error('Course not found');
      }
      courseEnrollment.course = course;
    }

    return this.courseEnrollmentsRepository.save(courseEnrollment);
  }

  async remove(id: number) {
    const courseEnrollment = await this.courseEnrollmentsRepository.findOne({
      where: { course_id: id },
    });
    if (!courseEnrollment) {
      throw new Error(`Course enrollment with ID ${id} not found`);
    }
    return this.courseEnrollmentsRepository.remove(courseEnrollment);
  }
}
