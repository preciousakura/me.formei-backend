import { FindByEmailAndUserNameRequest } from '@infra/database/prisma/repositories/prisma-students-repository';
import { Student } from '../entities/student/student';

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<void>;
  abstract findById(studentId: string): Promise<Student | null>;
  abstract update(student: Student): Promise<Student>;
  abstract delete(studentId: string): Promise<void>;
  abstract list(): Promise<Student[] | []>;
  abstract findByEmailAndUserName(
    request: FindByEmailAndUserNameRequest,
  ): Promise<Student | null>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Student[]>;
}
