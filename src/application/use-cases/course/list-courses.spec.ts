import { makeCourse } from '@test/factories/course-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { ListCourses } from './list-courses';

describe('List courses', () => {
  it('should be able to list a courses', async () => {
    const coursesRepository = new InMemoryCoursesRepository();

    const listCourses = new ListCourses(coursesRepository);
    const course1 = makeCourse();
    const course2 = makeCourse();
    const course3 = makeCourse();
    coursesRepository.create(course1);
    coursesRepository.create(course2);
    coursesRepository.create(course3);
    const { courses } = await listCourses.execute();

    expect(coursesRepository.courses).toEqual(courses);
    expect(coursesRepository.courses[0]).toEqual(course1);
    expect(coursesRepository.courses[1]).toEqual(course2);
    expect(coursesRepository.courses[2]).toEqual(course3);
  });
});
