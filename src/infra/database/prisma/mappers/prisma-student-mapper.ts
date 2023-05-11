import { City } from '@application/entities/city/city';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import {
  City as CityPrisma,
  Course,
  Curriculum,
  Student as RawStudentPrisma,
  State,
  University,
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
        city: City.create(
          { name: raw.user.city.name, stateId: raw.user.city.stateId },
          new UniqueEntityID(raw.user.city.id),
        ),
        state: raw.user.city.state.name,
        course: raw.curriculum.course.name,
        university: raw.curriculum.university.name,
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

type RawStudent = RawStudentPrisma & {
  user: User & {
    city: CityPrisma & {
      state: State;
    };
  };
  curriculum: Curriculum & {
    course: Course;
    university: University;
  };
};
