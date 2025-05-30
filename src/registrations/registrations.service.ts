import { Injectable } from '@nestjs/common';
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
      where: { studentId: createRegistrationDto.studentId },
    });
    if (!student) {
      throw new Error('Student not found');
    }
    // Add logic to create and save the registration here
    // Example:
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
          { studentId: search },
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
      where: { studentId: id.toString() },
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
      where: { studentId: id.toString() },
    });
    if (!registration) {
      throw new Error(`Registration with ID ${id} not found`);
    }
    return updateRegistrationDto;
  }

  async remove(id: number): Promise<string> {
    const registration = await this.registrationRepository.findOne({
      where: { studentId: id.toString() },
    });
    if (!registration) {
      throw new Error(`Registration with ID ${id} not found`);
    }
    await this.registrationRepository.remove(registration);
    return `This action removes a #${id} registration`;
  }
}
