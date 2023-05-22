import { makeCity } from '@test/factories/city-factory';
import { makeCourse } from '@test/factories/course-factory';
import { makeCurriculum } from '@test/factories/curriculum-factory';
import { makeState } from '@test/factories/state-factory';
import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryCitiesRepository } from '@test/repositories/in-memory-cities-repository';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryStatesRepository } from '@test/repositories/in-memory-states-repository';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CityNotFound } from '../errors/city-not-found';
import { CurriculumNotFound } from '../errors/curriculum-not-found';
import { CreateStudent } from './create-student';

describe('Create student', () => {
  it('should be able to create a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const state = makeState();

    statesRepository.create(state);

    const city = makeCity({
      stateId: state.id.toString(),
    });

    citiesRepository.create(city);

    const course = makeCourse();

    coursesRepository.create(course);

    const university = makeUniversity();

    universitiesRepository.create(university);
    const curriculum = makeCurriculum({
      course: course,
      university: university,
    });

    curriculumsRepository.create(curriculum);

    const createStudent = new CreateStudent(
      studentsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
      curriculumsRepository,
    );

    const { student, user } = await createStudent.execute({
      curriculumId: curriculum.id.toString(),
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      registration: '0000001',
      cityId: city.id.toString(),
      currentSemester: 2,
      enrollmentSemester: 1,
      enrollmentYear: 2021,
      lastname: 'Example lastname',
      username: 'Example username',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);

    expect(studentsRepository.students).toHaveLength(1);
    expect(studentsRepository.students[0]).toEqual(student);
  });

  it('should not be able to create a student if non existing curriculum', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();

    const createStudent = new CreateStudent(
      studentsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
      curriculumsRepository,
    );

    expect(() => {
      return createStudent.execute({
        curriculumId: 'fake curriculum-id',
        name: 'Example name',
        email: 'email@example.com',
        password: 'password123',
        registration: '0000001',
        cityId: 'fake city id',
        currentSemester: 2,
        enrollmentSemester: 1,
        enrollmentYear: 2021,
        lastname: 'Example lastname',
        username: 'Example username',
      });
    }).rejects.toThrow(CurriculumNotFound);
  });

  it('should not be able to create a student if non existing city', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const curriculum = makeCurriculum();
    curriculumsRepository.create(curriculum);

    const createStudent = new CreateStudent(
      studentsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
      curriculumsRepository,
    );

    expect(() => {
      return createStudent.execute({
        curriculumId: curriculum.id.toString(),
        name: 'Example name',
        email: 'email@example.com',
        password: 'password123',
        registration: '0000001',
        cityId: 'fake city id',
        currentSemester: 2,
        enrollmentSemester: 1,
        enrollmentYear: 2021,
        lastname: 'Example lastname',
        username: 'Example username',
      });
    }).rejects.toThrow(CityNotFound);
  });
});
