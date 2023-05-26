import { Student } from '@application/entities/student/student';
import { ApiProperty } from '@nestjs/swagger';
import { CityViewModel } from './city-view-model';
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
      name,
      email,
      registration,
      curriculumId,
      course: CourseViewModel.toHTTP(course),
      currentSemester,
      enrollmentSemester,
      enrollmentYear,
      lastname,
      studentId: studentId.toValue(),
      university: UniversityViewModel.toHTTP(university),
      username,
      city: CityViewModel.toHTTP(city),
    };
  }
}
