import { InMemoryCitiesRepository } from '@test/repositories/in-memory-cities-repository';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryStatesRepository } from '@test/repositories/in-memory-states-repository';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateStudent } from './create-student';

describe('Create student', () => {
  it('should be able to create a student', async () => {
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

    //caso de uso de criar um estado
    //caso de uso de criar uma cidade
    //caso de uso de criar um curso
    //caso de uso de criar uma universidade
    //caso de uso de criar um curriculo
    //adicionar nos repositorios

    const { student, user } = await createStudent.execute({
      curriculumId: 'example-curriculumId',
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      registration: '0000001',
      cityId: '123',
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
});
