import { Student } from './student';

describe('Student', () => {
  it('should be able to create a student', () => {
    const student = Student.create({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      curriculumId: 'example-curriculum-id',
      registration: '0000001',
    });

    expect(student).toBeTruthy();
  });
});
