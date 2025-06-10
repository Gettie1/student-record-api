import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Session } from 'src/sessions/entities/session.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private Subjectrepository: Repository<Subject>,
    @InjectRepository(Course) private CourseRepository: Repository<Course>,
    @InjectRepository(Session) private SessionRepository: Repository<Session>,
  ) {}
  async create(createSubjectDto: CreateSubjectDto) {
    // Ensure CreateSubjectDto and Subject entity have a 'subjectName' property
    const existingSubject = await this.Subjectrepository.findOne({
      where: { subjectName: createSubjectDto.subjectName },
      relations: ['course', 'sessions'],
    });
    if (existingSubject) {
      throw new BadRequestException(
        `Subject with name ${createSubjectDto.subjectName} already exists`,
      );
    }
    const subject = this.Subjectrepository.create({
      ...createSubjectDto,
      credits: Number(createSubjectDto.credits),
    });
    return this.Subjectrepository.save(subject);
  }

  async findAll() {
    try {
      if (!this.Subjectrepository) {
        throw new Error('Subject repository is not initialized');
      }
      return await this.Subjectrepository.find({
        relations: ['course', 'sessions'], // Assuming you want to include related entities
      });
    } catch (error) {
      console.error('Error finding subjects:', error);
      throw new NotFoundException('Subjects not found');
    }
  }

  async findOne(id: number) {
    try {
      const subject = await this.Subjectrepository.findOne({
        where: { subjectId: id.toString() },
        relations: ['course', 'sessions'], // Assuming you want to include related entities
      });
      if (!subject) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      return subject;
    } catch (error) {
      console.error(`Error finding subject with ID ${id}:`, error);
      throw new Error(`Subject with ID ${id} not found`);
    }
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    try {
      const subject = await this.Subjectrepository.findOne({
        where: { subjectId: id.toString() },
      });
      if (!subject) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      const updatedSubject = Object.assign(subject, updateSubjectDto);
      return this.Subjectrepository.save(updatedSubject);
    } catch (error) {
      console.error(`Error updating subject with ID ${id}:`, error);
      throw new Error(`Subject with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.Subjectrepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      return { message: `Subject with ID ${id} deleted successfully` };
    } catch (error) {
      console.error(`Error removing subject with ID ${id}:`, error);
      throw new Error(`Subject with ID ${id} not found`);
    }
  }
}
// The findAll method is already implemented within the SubjectsService class above.
// You can safely remove this placeholder function as it is redundant.
