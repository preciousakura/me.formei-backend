import { makeCity } from '@test/factories/city-factory';
import { makeCurriculum } from '@test/factories/curriculum-factory';
import { makeState } from '@test/factories/state-factory';
import { makeStudent } from '@test/factories/student-factory';
import { InMemoryCitiesRepository } from '@test/repositories/in-memory-cities-repository';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryStatesRepository } from '@test/repositories/in-memory-states-repository';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserAlreadyExists } from '../errors/user-already-exists';
import { RegisterAccountStudent } from './register-student';

describe('Register student', () => {
  it('should be able to register a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();

    const curriculum = makeCurriculum();

    curriculumsRepository.create(curriculum);

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
      curriculumsRepository,
    );

    const Student = makeStudent({
      city: city,
      curriculumId: curriculum.id.toString(),
    });

    const { student: studentUpdated } = await registerStudent.execute({
      email: Student.email,
      cityId: city.id.toString(),
      lastname: Student.lastname,
      name: Student.name,
      password: Student.password,
      username: Student.username,
      curriculumId: Student.curriculumId,
      currentSemester: Student.currentSemester,
      enrollmentSemester: Student.enrollmentSemester,
      enrollmentYear: Student.enrollmentYear,
      registration: Student.registration,
    });

    expect(studentsRepository.students[0]).toEqual(studentUpdated);
  });

  it('should not be able to create a student if existing a student with email and username match', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();

    const state = makeState();

    statesRepository.create(state);

    const city = makeCity({
      state: state,
    });

    citiesRepository.create(city);

    const curriculum = makeCurriculum();

    curriculumsRepository.create(curriculum);

    const Student = makeStudent({ curriculumId: curriculum.id.toString() });

    studentsRepository.create(Student);

    const registerStudent = new RegisterAccountStudent(
      studentsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
      curriculumsRepository,
    );

    expect(() => {
      return registerStudent.execute({
        email: Student.email,
        cityId: city.id.toString(),
        lastname: Student.lastname,
        name: Student.name,
        password: Student.password,
        username: Student.username,
        curriculumId: Student.curriculumId,
        currentSemester: Student.currentSemester,
        enrollmentSemester: Student.enrollmentSemester,
        enrollmentYear: Student.enrollmentYear,
        registration: Student.registration,
      });
    }).rejects.toThrow(UserAlreadyExists);
  });
});
