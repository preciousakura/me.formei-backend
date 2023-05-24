import { City } from '@application/entities/city/city';
import { Course } from '@application/entities/curriculum/course';
import { University } from '@application/entities/curriculum/university';
import { State } from '@application/entities/state/state';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import {
  City as CityPrisma,
  Course as CoursePrisma,
  Curriculum as CurriculumPrisma,
  Student as RawStudentPrisma,
  State as StatePrisma,
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
        city: City.create(
          {
            name: raw.user.city.name,
            state: State.create(
              { name: raw.user.city.state.name },
              new UniqueEntityID(raw.user.city.state.id),
            ),
          },
          new UniqueEntityID(raw.user.city.id),
        ),
        state: raw.user.city.state.name,
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

type RawStudent = RawStudentPrisma & {
  user: User & {
    city: CityPrisma & {
      state: StatePrisma;
    };
  };
  curriculum: CurriculumPrisma & {
    course: CoursePrisma;
    university: UniversityPrisma;
  };
};
