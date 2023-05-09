import { Student as RawStudent, User } from '@prisma/client';
import { Student } from 'src/application/entities/student/student';
// type RawStudent = {
//   registration: string;
//   curriculumId: string;
//   user: User;
// };

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      userId: student.id,
      registration: student.registration,
      curriculumId: student.curriculumId,
    };
  }

  static toDomain(
    raw: RawStudent & {
      user: User;
    },
  ): Student {
    return new Student(
      {
        email: raw.user.email,
        name: raw.user.name,
        password: raw.user.password,
      },
      { curriculumId: raw.curriculumId, registration: raw.registration },
      raw.user.id,
    );
  }
}
