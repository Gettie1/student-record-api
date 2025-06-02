import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEnrollment } from './entities/course-enrollment.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    @InjectRepository(CourseEnrollment)
    private courseEnrollmentsRepository: Repository<CourseEnrollment>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  async create(
    createCourseEnrollmentDto: CreateCourseEnrollmentDto,
  ): Promise<CreateCourseEnrollmentDto> {
    const courseEnrollment = this.courseEnrollmentsRepository.create(
      createCourseEnrollmentDto,
    );
    await this.courseEnrollmentsRepository.save(courseEnrollment);
    return createCourseEnrollmentDto;
  }

  findAll() {
    return `This action returns all courseEnrollments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseEnrollment`;
  }

  update(id: number, updateCourseEnrollmentDto: UpdateCourseEnrollmentDto) {
    return updateCourseEnrollmentDto;
  }

  remove(id: number) {
    return `This action removes a #${id} courseEnrollment`;
  }
}
