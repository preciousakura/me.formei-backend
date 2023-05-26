import { makeStudent } from '@test/factories/student-factory';
import { makeCity } from '@test/factories/city-factory';
import { makeState } from '@test/factories/state-factory';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryCitiesRepository } from '@test/repositories/in-memory-cities-repository';
import { InMemoryStatesRepository } from '@test/repositories/in-memory-states-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserAlreadyExists } from '../errors/user-already-exists';
import { RegisterAccountStudent } from './register-student';

describe('Register student', () => {
  it('should be able to register a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();

    const state = makeState();

    statesRepository.create(state);

    const city = makeCity({
      state: state,
    });

    citiesRepository.create(city);

    const registerStudent = new RegisterAccountStudent(
      studentsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
    );

    const Student = makeStudent({ city: city });

    const { student: studentUpdated } = await registerStudent.execute({
      email: Student.email,
      cityId: Student.city.id.toString(),
      lastname: Student.lastname,
      name: Student.name,
      password: Student.password,
      username: Student.username,
    });

    expect(studentsRepository.students[0]).toEqual(studentUpdated);
  });

  it('should not be able to create a student if existing a student with email and username match', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();

    const state = makeState();

    statesRepository.create(state);

    const city = makeCity({
      state: state,
    });

    citiesRepository.create(city);

    const Student = makeStudent();

    studentsRepository.create(Student);

    const registerStudent = new RegisterAccountStudent(
      studentsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
    );

    expect(() => {
      return registerStudent.execute({
        email: Student.email,
        cityId: city.id.toString(),
        lastname: Student.lastname,
        name: Student.name,
        password: Student.password,
        username: Student.username,
      });
    }).rejects.toThrow(UserAlreadyExists);
  });
});
