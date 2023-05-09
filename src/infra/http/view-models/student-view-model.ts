import { Student } from '@application/entities/student/student';

export class StudentViewModel {
  static toHTTP(student: Student) {
    const { curriculumId, email, id, name, registration } = student;
    return {
      id: id,
      name,
      email,
      registration,
      curriculumId,
    };
  }
}
