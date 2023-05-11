import { City } from '../city/city';
import { Student } from './student';

describe('Student', () => {
  it('should be able to create a student', () => {
    const student = Student.create({
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
      course: 'Example course',
      currentSemester: 1,
      enrollmentSemester: 1,
      enrollmentYear: 2021,
      lastname: 'Example lastname',
      state: 'Example state',
      university: 'Example university name',
    });

    expect(student).toBeTruthy();
  });
});
