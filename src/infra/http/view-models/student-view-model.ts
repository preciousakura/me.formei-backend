import { Student } from '@application/entities/student/student';
import { ApiProperty } from '@nestjs/swagger';

export class StudentViewModel {
  @ApiProperty()
  static toHTTP(student: Student) {
    const {
      curriculumId,
      email,
      id,
      name,
      registration,
      city,
      course,
      currentSemester,
      enrollmentSemester,
      enrollmentYear,
      lastname,
      state,
      studentId,
      university,
      username,
    } = student;

    return {
      id,
      name,
      email,
      registration,
      curriculumId,
      course,
      currentSemester,
      enrollmentSemester,
      enrollmentYear,
      lastname,
      state,
      studentId,
      university,
      username,
      city,
    };
  }
}
