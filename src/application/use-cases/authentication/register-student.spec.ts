import { makeCurriculum } from '@test/factories/curriculum-factory';
import { makeStudent } from '@test/factories/student-factory';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserAlreadyExists } from '../errors/user-already-exists';
import { RegisterAccountStudent } from './register-student';

describe('Register student', () => {
  it('should be able to register a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();

    const curriculum = makeCurriculum();

    curriculumsRepository.create(curriculum);

    const registerStudent = new RegisterAccountStudent(
      studentsRepository,
      usersRepository,
      curriculumsRepository,
    );

    const Student = makeStudent({
      curriculumId: curriculum.id.toString(),
    });

    const { student: studentUpdated } = await registerStudent.execute({
      email: Student.email,
      city: Student.city,
      state: Student.state,
      lastname: Student.lastname,
      name: Student.name,
      password: Student.password,
      username: Student.username,
      curriculumId: Student.curriculumId,
      enrollmentSemester: Student.enrollmentSemester,
      enrollmentYear: Student.enrollmentYear,
      registration: Student.registration,
    });

    expect(studentsRepository.students[0]).toEqual(studentUpdated);
  });

  it('should not be able to create a student if existing a student with email and username match', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();

    const curriculum = makeCurriculum();

    curriculumsRepository.create(curriculum);

    const Student = makeStudent({ curriculumId: curriculum.id.toString() });

    studentsRepository.create(Student);

    const registerStudent = new RegisterAccountStudent(
      studentsRepository,
      usersRepository,
      curriculumsRepository,
    );

    expect(() => {
      return registerStudent.execute({
        email: Student.email,
        city: Student.city,
        state: Student.state,
        lastname: Student.lastname,
        name: Student.name,
        password: Student.password,
        username: Student.username,
        curriculumId: Student.curriculumId,
        enrollmentSemester: Student.enrollmentSemester,
        enrollmentYear: Student.enrollmentYear,
        registration: Student.registration,
      });
    }).rejects.toThrow(UserAlreadyExists);
  });
});
