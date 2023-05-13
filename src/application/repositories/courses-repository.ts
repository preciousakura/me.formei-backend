import { Course } from '@application/entities/curriculum/course';
export abstract class CoursesRepository {
  abstract create(course: Course): Promise<void>;
  abstract findById(courseId: string): Promise<Course | null>;
  abstract save(course: Course): Promise<void>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
