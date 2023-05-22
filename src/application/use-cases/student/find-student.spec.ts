import { makeStudent } from '@test/factories/student-factory';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { FindStudent } from './find-student';

describe('Find student', () => {
  it('should be able to find a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();

    const findStudent = new FindStudent(studentsRepository);
    const student = makeStudent();
    studentsRepository.create(student);

    const { student: findedStudent } = await findStudent.execute({
      studentId: student.studentId.toString(),
    });

    expect(studentsRepository.students[0]).toEqual(findedStudent);
  });
});
