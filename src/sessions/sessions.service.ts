import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private Sessiontrepository: Repository<Session>,
    @InjectRepository(Subject) private SubjectRepository: Repository<Subject>,
  ) {}
  async create(createSessionDto: CreateSessionDto) {
    try {
      // Check if the subject exists
      const subject = await this.SubjectRepository.findOne({
        where: { subjectName: createSessionDto.subjectId },
      });
      if (!subject) {
        throw new NotFoundException(
          `Subject with ID ${createSessionDto.subjectId} not found`,
        );
      }

      const session = this.Sessiontrepository.create({
        ...createSessionDto,
        subject, // Associate the subject with the session
      });

      return await this.Sessiontrepository.save(session);
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error('Session creation failed');
    }
  }

  async findAll() {
    try {
      if (!this.Sessiontrepository) {
        throw new Error('Session repository is not initialized');
      }
      return await this.Sessiontrepository.find({
        relations: ['subject'], // Assuming you want to include the related subject entity
      });
    } catch (error) {
      console.error('Error finding sessions:', error);
      throw new Error('Sessions not found');
    }
  }

  async findOne(id: number) {
    try {
      const session = await this.Sessiontrepository.findOne({
        where: { id: id.toString() },
        relations: ['subject'], // Assuming you want to include the related subject entity
      });
      if (!session) {
        throw new Error(`Session with ID ${id} not found`);
      }
      return session;
    } catch (error) {
      console.error(`Error finding session with ID ${id}:`, error);
      throw new Error(`Session with ID ${id} not found`);
    }
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.Sessiontrepository.findOne({
      where: { id: id.toString() },
      relations: ['subject'], // Assuming you want to include the related subject entity
    });
    if (!session) {
      throw new Error(`Session with ID ${id} not found`);
    }
    Object.assign(session, updateSessionDto);
    return this.Sessiontrepository.save(session);
  }

  async remove(id: number) {
    const session = await this.Sessiontrepository.findOne({
      where: { id: id.toString() },
      relations: ['subject'], // Assuming you want to include the related subject entity
    });
    if (!session) {
      throw new Error(`Session with ID ${id} not found`);
    }
    await this.Sessiontrepository.remove(session);
    return { message: `Session with ID ${id} deleted successfully` };
  }
}
