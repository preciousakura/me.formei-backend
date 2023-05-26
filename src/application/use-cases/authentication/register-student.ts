import { Student } from '@application/entities/student/student';
import { User } from '@application/entities/user/user';
import { CitiesRepository } from '@application/repositories/cities-repository';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { StatesRepository } from '@application/repositories/states-repository';
import { StudentsRepository } from '@application/repositories/students-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { CityNotFound } from '../errors/city-not-found';
import { CurriculumNotFound } from '../errors/curriculum-not-found';
import { StateNotFound } from '../errors/state-not-found';
import { UserAlreadyExists } from '../errors/user-already-exists';

import { CreateStudentBody } from '@infra/http/dto/student/create-student.dto';
import * as bcrypt from 'bcrypt';

export class RegisterAccountStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private usersRepository: UsersRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
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
      cityId,
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

    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw new CityNotFound();
    }

    const state = await this.statesRepository.findById(city.state.id.toValue());

    if (!state) {
      throw new StateNotFound();
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      city,
      lastname,
      username,
      state: state.name,
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
        state: state.name,
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
