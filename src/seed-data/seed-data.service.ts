import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Registration } from 'src/registrations/entities/registration.entity';
import { Repository, DataSource } from 'typeorm';
import { CourseEnrollment } from 'src/course-enrollments/entities/course-enrollment.entity';
import { faker } from '@faker-js/faker/locale/af_ZA';
import { Profile } from 'src/profiles/entities/profile.entity';
// Import Role enum from its correct location, adjust the path as needed
import { Role } from 'src/profiles/entities/profile.entity';

@Injectable()
export class SeedDataService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(CourseEnrollment)
    private readonly courseEnrollmentRepository: Repository<CourseEnrollment>,
    private readonly dataSource: DataSource, // Assuming you have a DataSource instance injected
    private readonly logger: Logger = new Logger(SeedDataService.name),
  ) {}
  async seedData() {
    this.logger.log('Started seeding data...');
    try {
      this.logger.log('Clearing existing data...');
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.query('DELETE FROM STUDENT_COURSES_COURSE');
        await queryRunner.query('DELETE FROM COURSE_ENROLLMENT');
        await queryRunner.query('DELETE FROM REGISTRATION');
        await queryRunner.query('DELETE FROM STUDENT');
        await queryRunner.query('DELETE FROM COURSE');
        await queryRunner.commitTransaction();
        await queryRunner.release();
        this.logger.log('Existing data cleared successfully.');
      } catch (error) {
        await queryRunner.rollbackTransaction();
        this.logger.error('Error clearing existing data:', error);
      }
      this.logger.log('Seeding new course_enrollments...');
      const courses: Course[] = [];
      const coursesNames = [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Computer Science',
        'History',
        'English Literature',
      ];
      for (const courseName of coursesNames) {
        const newCourse = new Course();
        newCourse.courseName = courseName;
        newCourse.description = faker.lorem.sentence();
        newCourse.createdAt = faker.date.future();
        newCourse.updatedAt = faker.date.future();
        newCourse.credits = faker.number.int({ min: 1, max: 5 });
        newCourse.status = 'active'; // Assuming a default status
        newCourse.courseCode = faker.string.alphanumeric(6).toUpperCase();
        courses.push(await this.courseRepository.save(newCourse));
      }
      this.logger.log('created new courses successfully.');
      //seeding courseEnrollments
      this.logger.log('Seeding courseEnrollments...');
      const courseEnrollment: CourseEnrollment[] = [];
      for (const course of courses) {
        const newCourseEnrollment = new CourseEnrollment();
        newCourseEnrollment.course = course;
        newCourseEnrollment.enroll_date = faker.date.past();
        newCourseEnrollment.status = 'enrolled'; // Assuming a default status
        newCourseEnrollment.course_id = Number(course.id); // Convert course.id to number
        newCourseEnrollment.grade = faker.string.alphanumeric(2).toUpperCase(); // Random grade
        courseEnrollment.push(
          await this.courseEnrollmentRepository.save(newCourseEnrollment),
        );
        this.logger.log(
          `Created courseEnrollment for course ${course.courseName} successfully.`,
        );
      }
      // seeding registrations
      this.logger.log('Seeding registrations...');
      const registrations: Registration[] = [];
      for (const course of courses) {
        const newRegistration = new Registration();
        newRegistration.courseId = course.id;
        newRegistration.registrationDate = faker.date.past();
        newRegistration.status = 'registered';
        newRegistration.id = faker.string.uuid(); // Assuming id is a UUID
        newRegistration.sessionId = faker.string.uuid(); // Assuming sessionId is a UUID
        newRegistration.subjectId = faker.string.uuid(); // Assuming subjectId is a UUID
        registrations.push(
          await this.registrationRepository.save(newRegistration),
        );
      }
      this.logger.log(
        `Created ${registrations.length} registrations successfully.`,
      );
      // seeding profiles and linking to students
      this.logger.log('Seeding profiles and students...');
      const students: Student[] = [];
      for (let i = 0; i < 10; i++) {
        //create a new profile
        const newProfile = new Profile();
        newProfile.firstName = faker.person.firstName();
        newProfile.lastName = faker.person.lastName();
        newProfile.email = faker.internet.email();
        newProfile.password = faker.internet.password();
        newProfile.role = Role.STUDENT; // Assuming a default role
        //save the profile
        const savedProfile = await this.profileRepository.save(newProfile);
        //create a new student
        const newStudent = new Student();
        newStudent.profile = savedProfile; // Link profile to student as an array
        newStudent.firstName = savedProfile.firstName;
        newStudent.lastName = savedProfile.lastName;
        newStudent.profilePicture = faker.image.avatar();
        newStudent.email = faker.internet.email();
        newStudent.phoneNumber = faker.phone.number();
        newStudent.address = faker.location.streetAddress();
        newStudent.createdAt = faker.date.past();
        newStudent.updatedAt = faker.date.recent();
        newStudent.status = 'active'; // Assuming a default status
        //save the student
        const savedStudent = await this.studentRepository.save(newStudent);
        const courseToEnroll = faker.helpers.arrayElement(courses);
        // Enroll the student in a random course
        const courseEnrollment = new CourseEnrollment();
        courseEnrollment.student = savedStudent;
        courseEnrollment.course = courseToEnroll;
        courseEnrollment.enroll_date = faker.date.past();
        courseEnrollment.grade = faker.string.alphanumeric(2).toUpperCase(); // Random grade
        courseEnrollment.course_id = Number(courseToEnroll.id); // Convert course.id to number
        courseEnrollment.status = 'enrolled'; // Assuming a default status
        await this.courseEnrollmentRepository.save(courseEnrollment);
        // Add the saved student to the array
        students.push(savedStudent);
      }
      this.logger.log(`Created ${students.length} students successfully.`);
    } catch (error) {
      this.logger.error('Error during seeding process:', error);
      throw error;
    }
  }
}
