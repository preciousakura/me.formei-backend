import { makeCourse } from '@test/factories/course-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { FindCourse } from './find-course';

describe('Find course', () => {
  it('should be able to find a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();

    const findCourse = new FindCourse(coursesRepository);
    const course = makeCourse();
    coursesRepository.create(course);

    const { course: findedCourse } = await findCourse.execute({
      courseId: course.id.toString(),
    });

    expect(coursesRepository.courses[0]).toEqual(findedCourse);
  });
});
