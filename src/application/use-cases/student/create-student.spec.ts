import { makeCourse } from '@test/factories/course-factory';
import { makeCurriculum } from '@test/factories/curriculum-factory';
import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CurriculumNotFound } from '../errors/curriculum-not-found';
import { CreateStudent } from './create-student';

describe('Create student', () => {
  it('should be able to create a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const universitiesRepository = new InMemoryUniversitiesRepository();

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
      curriculumsRepository,
    );

    const { student, user } = await createStudent.execute({
      curriculumId: curriculum.id.toString(),
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      registration: '0000001',
      city: 'example city',
      state: 'example state',
      enrollmentSemester: 1,
      enrollmentYear: 2021,
      lastname: 'Example lastname',
      username: 'Example username',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);

    expect(studentsRepository.students).toHaveLength(1);
    expect(studentsRepository.students[0]).toEqual(student);
    console.log(student);
  });

  it('should not be able to create a student if non existing curriculum', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();

    const createStudent = new CreateStudent(
      studentsRepository,
      usersRepository,
      curriculumsRepository,
    );

    expect(() => {
      return createStudent.execute({
        curriculumId: 'fake curriculum-id',
        name: 'Example name',
        email: 'email@example.com',
        password: 'password123',
        registration: '0000001',
        city: 'example city',
        state: 'example state',
        enrollmentSemester: 1,
        enrollmentYear: 2021,
        lastname: 'Example lastname',
        username: 'Example username',
      });
    }).rejects.toThrow(CurriculumNotFound);
  });
});
