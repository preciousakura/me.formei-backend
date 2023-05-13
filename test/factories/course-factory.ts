import { Course, CourseProps } from '@application/entities/curriculum/course';

type Override = Partial<CourseProps>;

export function makeCourse(override: Override = {}) {
  return Course.create({
    name: 'example name state',
    ...override,
  });
}
