import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { User } from '@application/entities/user/user';
import { StudentsRepository } from '@application/repositories/students-repository';
import { UsersRepository } from '@application/repositories/users-repository';

interface CreateStudentRequest {
  registration: string;
  curriculumId: string;
  name: string;
  email: string;
  password: string;
}

interface CreateStudentResponse {
  student: Student;
  user: User; // for test
}

@Injectable()
export class CreateStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const { curriculumId, email, name, password, registration } = request;

    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    const student = new Student(user, { curriculumId, registration }, user.id);

    await this.usersRepository.create(user);
    await this.studentsRepository.create(student);

    return {
      student,
      user,
    };
  }
}
