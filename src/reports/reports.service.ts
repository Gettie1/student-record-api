import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private ReportsRepository: Repository<Report>,
    @InjectRepository(Student) private StudentRepository: Repository<Student>,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const student = await this.StudentRepository.findOne({
      where: { id: createReportDto.student_id },
    });

    if (!student) {
      throw new NotFoundException(
        `Student with ${createReportDto.student_id} not found`,
      );
    }

    const report = this.ReportsRepository.create({
      ...createReportDto,
      students: [student],
    });

    return this.ReportsRepository.save(report);
  }

  async findAll(search?: string) {
    if (search) {
      return this.ReportsRepository.find({
        where: [
          { reportId: search },
          { reportContent: search },
          { students: { firstName: search } }, // Assuming you want to search by student's first name
          { students: { lastName: search } }, // Assuming you want to search by student's last name
        ],
        relations: ['students'], // Include students relation
      });
    }
    return this.ReportsRepository.find({ relations: ['students'] });
  }

  async findOne(id: number) {
    const report = await this.ReportsRepository.findOne({
      where: { reportId: id.toString() },
      relations: ['students'], // Include students relation
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.ReportsRepository.findOne({
      where: { reportId: id.toString() },
      relations: ['students'], // Include students relation
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    // Update the report properties
    Object.assign(report, updateReportDto);

    // If students are provided in the update, find and assign them
    if (updateReportDto.student_id) {
      const student = await this.StudentRepository.findOne({
        where: { id: updateReportDto.student_id },
      });
      if (!student) {
        throw new NotFoundException(
          `Student with ID ${updateReportDto.student_id} not found`,
        );
      }
      report.students = [student];
    }

    return this.ReportsRepository.save(report);
  }

  async remove(id: number) {
    const report = await this.ReportsRepository.findOne({
      where: { reportId: id.toString() },
      relations: ['students'], // Include students relation
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    await this.ReportsRepository.remove(report);
    return 'Report with ID ' + id + ' has been deleted successfully';
  }
}
