import { makeStudent } from '@test/factories/student-factory';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { UpdateStudent } from './update-student';

describe('Update student', () => {
  it('should be able to update a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();

    const updateStudent = new UpdateStudent(studentsRepository);
    const student = makeStudent();
    studentsRepository.create(student);

    const studentRequest = student;
    studentRequest.name = 'Fulano';
    studentRequest.username = 'Novo username';

    const { student: studentUpdated } = await updateStudent.execute({
      id: studentRequest.studentId.toString(),
      student: studentRequest,
    });

    expect(studentsRepository.students[0]).toEqual(studentUpdated);
  });
});
