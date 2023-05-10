import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { User, UserProps } from '@application/entities/user/user';
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
  user: User<UserProps>;
}

@Injectable()
export class CreateStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const { curriculumId, email, name, password, registration } = request;

    const user = User.create({
      name: name,
      email: email,
      password: password,
    });

    //Validar se curriculo existe

    const student = Student.create(
      { curriculumId, registration, name, email, password },
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
