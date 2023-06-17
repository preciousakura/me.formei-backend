import { Student } from '@application/entities/student/student';
import { ApiProperty } from '@nestjs/swagger';
import { CourseViewModel } from './course-view-model';
import { UniversityViewModel } from './university-view-model';

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
      state,
      course,
      currentSemester,
      enrollmentSemester,
      enrollmentYear,
      lastname,
      studentId,
      university,
      username,
    } = student;

    return {
      id: id.toValue(),
      studentId: studentId.toValue(),
      name,
      lastname,
      username,
      email,
      registration,
      curriculumId,
      city,
      state,
      currentSemester,
      enrollmentSemester,
      enrollmentYear,
      course: CourseViewModel.toHTTP(course),
      university: UniversityViewModel.toHTTP(university),
    };
  }
}
