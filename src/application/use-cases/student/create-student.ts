import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { User, UserProps } from '@application/entities/user/user';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { StudentsRepository } from '@application/repositories/students-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { CurriculumNotFound } from '../errors/curriculum-not-found';

interface CreateStudentRequest {
  registration: string;
  curriculumId: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  lastname: string;
  username: string;
  currentSemester: number;
  enrollmentSemester: number;
  enrollmentYear: number;
}

interface CreateStudentResponse {
  student: Student;
  user: User<UserProps>;
}

@Injectable()
export class CreateStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private usersRepository: UsersRepository,
    private curriculumsRepository: CurriculumsRepository,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const {
      city,
      state,
      lastname,
      username,
      curriculumId,
      email,
      name,
      password,
      registration,
      currentSemester,
      enrollmentSemester,
      enrollmentYear,
    } = request;

    const curriculum = await this.curriculumsRepository.findById(curriculumId);

    if (!curriculum) {
      throw new CurriculumNotFound();
    }

    const user = User.create({
      name,
      email,
      password,
      city,
      lastname,
      username,
      state,
    });

    const student = Student.create(
      {
        curriculumId,
        registration,
        name,
        email,
        password,
        city,
        course: curriculum.course,
        currentSemester,
        enrollmentSemester,
        enrollmentYear,
        lastname,
        state: state,
        university: curriculum.university,
        username,
      },
      user.id,
    );

    await this.usersRepository.create(user);
    await this.studentsRepository.create(student);

    return {
      student,
      user,
    };
  }
}
