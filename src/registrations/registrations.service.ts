import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { Registration } from './entities/registration.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  async create(
    createRegistrationDto: CreateRegistrationDto,
  ): Promise<Registration> {
    const student = await this.studentRepository.findOne({
      where: { id: createRegistrationDto.id },
    });
    if (!student) {
      throw new Error('Student not found');
    }
    const registration = this.registrationRepository.create({
      ...createRegistrationDto,
      student,
    });
    return this.registrationRepository.save(registration);
  }

  async findAll(search?: string): Promise<Registration[]> {
    if (search) {
      return this.registrationRepository.find({
        where: [
          { id: search },
          { courseId: search },
          { sessionId: search },
          { subjectId: search },
          {
            registrationDate: isNaN(Date.parse(search))
              ? undefined
              : new Date(search),
          },
          { status: search },
          { student: { firstName: search } }, // Assuming you want to search by student's first name
          { student: { lastName: search } }, // Assuming you want to search by student's last name
        ],
      });
    }
    return this.registrationRepository.find();
  }

  async findOne(id: number): Promise<Registration> {
    const registration = await this.registrationRepository.findOne({
      where: { id: id.toString() },
    });
    if (!registration) {
      throw new Error(`Registration with ID ${id} not found`);
    }
    return registration;
  }

  async update(
    id: number,
    updateRegistrationDto: UpdateRegistrationDto,
  ): Promise<UpdateRegistrationDto> {
    const registration = await this.registrationRepository.findOne({
      where: { id: id.toString() },
    });
    if (!registration) {
      throw new Error(`Registration with ID ${id} not found`);
    }
    return updateRegistrationDto;
  }

  async remove(id: number): Promise<Registration> {
    const registration = await this.registrationRepository.findOne({
      where: { id: id.toString() },
    });
    if (!registration) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    return await this.registrationRepository.remove(registration);
  }
}
