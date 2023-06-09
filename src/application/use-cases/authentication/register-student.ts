import { Student } from '@application/entities/student/student';
import { User } from '@application/entities/user/user';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { StudentsRepository } from '@application/repositories/students-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { CurriculumNotFound } from '../errors/curriculum-not-found';
import { UserAlreadyExists } from '../errors/user-already-exists';

import { CreateStudentBody } from '@infra/http/dto/student/create-student.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterAccountStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private usersRepository: UsersRepository,
    private curriculumsRepository: CurriculumsRepository,
  ) {}

  async execute(request: CreateStudentBody) {
    const {
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
      city,
      state,
    } = request;

    const studentAlreadyExists =
      await this.studentsRepository.findByEmailAndUserName({ email, username });

    if (studentAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const curriculum = await this.curriculumsRepository.findById(curriculumId);

    if (!curriculum) {
      throw new CurriculumNotFound();
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      city,
      lastname,
      username,
      state: state,
    });

    const student = Student.create(
      {
        curriculumId,
        registration,
        name,
        email,
        password: hashedPassword,
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
