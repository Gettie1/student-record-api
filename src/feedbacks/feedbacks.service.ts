import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { Student } from 'src/student/entities/student.entity/student.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const {
      user_id,
      subjectId,
      feedback,
      rating,
      timestamp,
      additional_comments,
    } = createFeedbackDto;

    // Check if the student exists
    const student = await this.studentRepository.findOne({
      where: { id: String(user_id) },
      relations: ['feedbacks'], // Load feedbacks relation
    });
    if (!student) {
      throw new NotFoundException(`Student with user_id ${user_id} not found`);
    }

    // Create a new feedback instance
    const newFeedback = this.feedbackRepository.create({
      user_id,
      subjectId,
      feedback,
      rating,
      timestamp: new Date(timestamp),
      additional_comments,
      student,
    }); // Use the student entity directly
    console.log('New Feedback:', newFeedback);

    // Save the feedback to the database
    return this.feedbackRepository.save(newFeedback);
  }

  async findAll(search?: string) {
    if (search) {
      return this.feedbackRepository.find({
        where: [
          { user_id: search },
          { subjectId: search },
          { feedback: search },
          { rating: search },
          { additional_comments: search },
          { student: { firstName: search } }, // Assuming you want to search by student's first name
          { student: { lastName: search } }, // Assuming you want to search by student's last name
        ],
        relations: ['student'], // Load student relation if needed
      });
    }
    return this.feedbackRepository.find({ relations: ['student'] });
  }

  async findOne(id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { user_id: String(id) },
      relations: ['student'], // Load student relation if needed
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    }
    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.feedbackRepository.findOne({
      where: { user_id: String(id) },
      relations: ['student'], // Load student relation if needed
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    }

    // Update the feedback properties
    Object.assign(feedback, updateFeedbackDto);

    // Save the updated feedback to the database
    return this.feedbackRepository.save(feedback);
  }

  async remove(id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { user_id: String(id) },
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback with id ${id} not found`);
    }
    await this.feedbackRepository.remove(feedback);
    return `Feedback with id ${id} has been removed`;
  }
}
