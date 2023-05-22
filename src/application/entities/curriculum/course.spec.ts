import { Course } from './course';

describe('Course', () => {
  it('should be able to create a course', () => {
    const course = Course.create({
      name: 'Example name',
    });

    expect(course).toBeTruthy();
  });
});
