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

  async update(course: Course): Promise<Course> {
    const index = this.courses.findIndex((item) => item.id === course.id);

    if (index >= 0) {
      this.courses[index] = course;
    }
    return this.courses[index];
  }

  async list(): Promise<Course[] | []> {
    return this.courses;
  }

  async delete(courseId: string): Promise<void> {
    const coursesIndex = this.courses.findIndex(
      (item) => item.id.toString() === courseId,
    );

    if (coursesIndex >= 0) {
      this.courses.splice(coursesIndex, 1);
    }
  }
}
