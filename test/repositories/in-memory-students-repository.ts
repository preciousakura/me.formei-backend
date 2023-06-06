import { FindByEmailAndUserNameRequest } from '@infra/database/prisma/repositories/prisma-students-repository';
import { Student } from 'src/application/entities/student/student';
import { StudentsRepository } from 'src/application/repositories/students-repository';

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = [];

  async findById(studentId: string): Promise<Student | null> {
    // console.log(studentId);
    // console.log(this.students[0].studentId);

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

  async update(student: Student): Promise<Student> {
    const studentIndex = this.students.findIndex(
      (item) => item.registration === student.registration,
    );

    if (studentIndex >= 0) {
      this.students[studentIndex] = student;
    }
    return this.students[studentIndex];
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

  async findByEmailAndUserName(
    request: FindByEmailAndUserNameRequest,
  ): Promise<Student | null> {
    const { email, username } = request;
    const student = this.students.find(
      (item) => item.email === email || item.username == username,
    );
    if (!student) {
      return null;
    }

    return student;
  }

  async findByUsername(username: string): Promise<Student | null> {
    const student = this.students.find((item) => item.username == username);
    if (!student) {
      return null;
    }

    return student;
  }

  async findByUserId(userId: string): Promise<Student | null> {
    const student = this.students.find((item) => item.id.toString() == userId);
    if (!student) {
      return null;
    }

    return student;
  }
}
