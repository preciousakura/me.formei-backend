import { makeCourse } from '@test/factories/course-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { UpdateCourse } from './update-course';

describe('Update course', () => {
  it('should be able to update a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();

    const updateCourse = new UpdateCourse(coursesRepository);
    const course = makeCourse();
    coursesRepository.create(course);

    const courseRequest = course;
    courseRequest.name = 'Curso Tal';

    const { course: courseUpdated } = await updateCourse.execute({
      course: courseRequest,
    });

    expect(coursesRepository.courses[0]).toEqual(courseUpdated);
  });
});
