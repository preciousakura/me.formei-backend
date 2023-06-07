import { makeCourse } from '@test/factories/course-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { DeleteCourse } from './delete-course';

describe('Delete course', () => {
  it('should be able to delete a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();

    const course = makeCourse();
    coursesRepository.create(course);

    const deleteCourse = new DeleteCourse(coursesRepository);

    const { course: courseDeleted } = await deleteCourse.execute({
      courseId: course.id.toString(),
    });

    expect(coursesRepository.courses).toHaveLength(0);
    expect(course).toEqual(courseDeleted);
  });
});
