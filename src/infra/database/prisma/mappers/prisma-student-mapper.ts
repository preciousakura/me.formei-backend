import { Course } from '@application/entities/curriculum/course';
import { University } from '@application/entities/curriculum/university';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import {
  Course as CoursePrisma,
  Curriculum as CurriculumPrisma,
  Student as RawStudentPrisma,
  University as UniversityPrisma,
  User,
} from '@prisma/client';
import { Student } from 'src/application/entities/student/student';

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      id: student.studentId.toString(),
      userId: student.id.toString(),
      registration: student.registration,
      curriculumId: student.curriculumId,
      enrollmentYear: student.enrollmentYear,
      enrollmentSemester: student.enrollmentSemester,
      currentSemester: student.currentSemester,
    };
  }

  static toDomain(raw: RawStudent): Student {
    return Student.create(
      {
        email: raw.user.email,
        name: raw.user.name,
        password: raw.user.password,
        curriculumId: raw.curriculumId,
        registration: raw.registration,
        studentId: new UniqueEntityID(raw.id),
        city: raw.user.city,
        state: raw.user.state,
        course: Course.create(
          {
            name: raw.curriculum.course.name,
          },
          new UniqueEntityID(raw.curriculum.course.id),
        ),
        university: University.create(
          {
            name: raw.curriculum.university.name,
            abv: raw.curriculum.university.abv,
            city: raw.curriculum.university.city,
            state: raw.curriculum.university.state,
          },
          new UniqueEntityID(raw.curriculum.university.id),
        ),
        username: raw.user.username,
        lastname: raw.user.lastname,
        currentSemester: raw.currentSemester,
        enrollmentSemester: raw.enrollmentSemester,
        enrollmentYear: raw.enrollmentYear,
      },
      new UniqueEntityID(raw.user.id),
    );
  }
}

export type RawStudent = RawStudentPrisma & {
  user: User;
  curriculum: CurriculumPrisma & {
    course: CoursePrisma;
    university: UniversityPrisma;
  };
};
