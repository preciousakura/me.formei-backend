import { Course } from '@application/entities/curriculum/course';
import { CoursesRepository } from '@application/repositories/courses-repository';

export class InMemoryCoursesRepository implements CoursesRepository {
  public courses: Course[] = [];

  async findById(courseId: string): Promise<Course | null> {
    const course = this.courses.find((item) => item.id.toString() === courseId);

    if (!course) {
      return null;
    }

    return course;
  }

  // async findManyByAnyId(AnyId: string): Promise<Curriculum[]> {
  //   return this.universitys.filter((course) => course.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.universitys.filter((course) => course.AnyId === AnyId).length;
  // }

  async create(course: Course) {
    this.courses.push(course);
  }

  async save(course: Course): Promise<void> {
    const index = this.courses.findIndex((item) => item.id === course.id);

    if (index >= 0) {
      this.courses[index] = course;
    }
  }
}