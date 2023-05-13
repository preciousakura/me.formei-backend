import { makeStudent } from '@test/factories/student-factory';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { StudentNotFound } from '../errors/student-not-found';
import { DeleteStudent } from './delete-student';

describe('Delete student', () => {
  it('should be able to delete a student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();

    const student = makeStudent();
    studentsRepository.create(student);

    const deleteStudent = new DeleteStudent(studentsRepository);

    const { student: studentDeleted } = await deleteStudent.execute({
      studentId: student.studentId.toString(),
    });

    expect(studentsRepository.students).toHaveLength(0);
    expect(student).toEqual(studentDeleted);
  });

  it('should not be able to delete a student if non existing student', async () => {
    const studentsRepository = new InMemoryStudentsRepository();

    const deleteStudent = new DeleteStudent(studentsRepository);

    expect(() => {
      return deleteStudent.execute({
        studentId: 'fake student id',
      });
    }).rejects.toThrow(StudentNotFound);
  });
});
