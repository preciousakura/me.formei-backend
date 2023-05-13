import { makeStudent } from '@test/factories/student-factory';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { ListStudents } from './list-students';

describe('List students', () => {
  it('should be able to list a students', async () => {
    const studentsRepository = new InMemoryStudentsRepository();

    const listStudents = new ListStudents(studentsRepository);
    const student1 = makeStudent();
    const student2 = makeStudent();
    const student3 = makeStudent();
    studentsRepository.create(student1);
    studentsRepository.create(student2);
    studentsRepository.create(student3);
    const { students } = await listStudents.execute();

    expect(studentsRepository.students).toEqual(students);
    expect(studentsRepository.students[0]).toEqual(student1);
    expect(studentsRepository.students[1]).toEqual(student2);
    expect(studentsRepository.students[2]).toEqual(student3);
  });
});
