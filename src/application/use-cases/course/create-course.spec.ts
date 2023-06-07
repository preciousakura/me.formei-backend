import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { CreateCourse } from './create-course';

describe('Create course', () => {
  it('should be able to create a course', async () => {
    const coursesRepository = new InMemoryCoursesRepository();
    const createCourse = new CreateCourse(coursesRepository);

    const { course } = await createCourse.execute({
      name: 'Example course',
    });

    expect(coursesRepository.courses).toHaveLength(1);
    expect(coursesRepository.courses[0]).toEqual(course);
  });
});
