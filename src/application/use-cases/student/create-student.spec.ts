import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateStudent } from './create-student';

describe('Create student', () => {
  it('should be able to create a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createStudent = new CreateStudent(
      studentsRepository,
      usersRepository,
    );

    const { student, user } = await createStudent.execute({
      curriculumId: 'example-curriculumId',
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      registration: '0000001',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);

    expect(studentsRepository.students).toHaveLength(1);
    expect(studentsRepository.students[0]).toEqual(student);
  });
});
