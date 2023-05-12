import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { User, UserProps } from '@application/entities/user/user';
import { CitiesRepository } from '@application/repositories/cities-repository';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { StatesRepository } from '@application/repositories/states-repository';
import { StudentsRepository } from '@application/repositories/students-repository';
import { UsersRepository } from '@application/repositories/users-repository';

interface CreateStudentRequest {
  registration: string;
  curriculumId: string;
  name: string;
  email: string;
  password: string;
  cityId: string;
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
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
    private curriculumsRepository: CurriculumsRepository,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const {
      cityId,
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

    //verificar se cidade existe

    const curriculum = await this.curriculumsRepository.findById(curriculumId);

    if (!curriculum) {
      throw Error('Curriculum not found');
    }

    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw Error('City not found');
    }

    const state = await this.statesRepository.findById(city.stateId);

    if (!state) {
      throw Error('State not found');
    }

    const user = User.create({
      name,
      email,
      password,
      city,
      lastname,
      username,
      state: state.name,
    });

    //Validar se curriculo existe
    //encontra a matriz e ja passa as informaçoes pro student

    const student = Student.create(
      {
        curriculumId,
        registration,
        name,
        email,
        password,
        city,
        course: curriculum.course.name,
        currentSemester,
        enrollmentSemester,
        enrollmentYear,
        lastname,
        state: state.name,
        university: curriculum.university.name,
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
