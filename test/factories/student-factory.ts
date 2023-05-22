import { City } from '@application/entities/city/city';
import { Course } from '@application/entities/curriculum/course';
import { University } from '@application/entities/curriculum/university';
import { Student, StudentProps } from '@application/entities/student/student';

type Override = Partial<StudentProps>;

export function makeStudent(override: Override = {}) {
  return Student.create({
    name: 'Example name',
    email: 'email@example.com',
    password: 'password123',
    curriculumId: 'example-curriculum-id',
    registration: '0000001',
    username: 'Example username',
    city: City.create({
      name: 'example city name',
      stateId: 'example-state-id',
    }),
    course: Course.create({
      name: 'example course name',
    }),
    currentSemester: 1,
    enrollmentSemester: 1,
    enrollmentYear: 2021,
    lastname: 'Example lastname',
    state: 'Example state',
    university: University.create({
      name: 'Example university name',
      abv: 'example abv',
    }),
    ...override,
  });
}
