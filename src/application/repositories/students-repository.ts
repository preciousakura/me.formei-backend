import { Student } from '../entities/student/student';

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<void>;
  abstract findById(studentId: string): Promise<Student | null>;
  abstract save(student: Student): Promise<void>;
  abstract list(): Promise<Student[] | []>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Student[]>;
}
