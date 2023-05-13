import { Student } from 'src/application/entities/student/student';
import { StudentsRepository } from 'src/application/repositories/students-repository';

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = [];

  async findById(studentId: string): Promise<Student | null> {
    const student = this.students.find(
      (item) => item.studentId.toString() === studentId,
    );

    if (!student) {
      return null;
    }

    return student;
  }

  // async findManyByAnyId(AnyId: string): Promise<Student[]> {
  //   return this.students.filter((student) => student.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.students.filter((student) => student.AnyId === AnyId).length;
  // }

  async create(student: Student) {
    this.students.push(student);
  }

  async save(student: Student): Promise<void> {
    const studentIndex = this.students.findIndex(
      (item) => item.registration === student.registration,
    );

    if (studentIndex >= 0) {
      this.students[studentIndex] = student;
    }
  }

  async list(): Promise<Student[] | []> {
    return this.students;
  }

  async delete(studentId: string): Promise<void> {
    const studentIndex = this.students.findIndex(
      (item) => item.studentId.toString() === studentId,
    );

    if (studentIndex >= 0) {
      this.students.splice(studentIndex, 1);
    }
  }
}
