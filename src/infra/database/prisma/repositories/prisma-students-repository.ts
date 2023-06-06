import { Injectable } from '@nestjs/common';
import { Student } from 'src/application/entities/student/student';
import { StudentsRepository } from 'src/application/repositories/students-repository';
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(studentId: string): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: {
        registration: studentId,
      },
      include: {
        user: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        curriculum: {
          include: {
            course: true,
            university: true,
          },
        },
      },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }

  // async findManyByAnyId(anyId: string): Promise<Student[]> {
  //   const students = await this.prisma.student.findMany({
  //     where: {
  //       anyId,
  //     },
  //   });

  //   return students.map(PrismaStudentMapper.toDomain);
  // }

  // async countManyByAnyId(anyId: string): Promise<number> {
  //   const count = await this.prisma.student.count({
  //     where: {
  //       anyId,
  //     },
  //   });

  //   return count;
  // }

  async create(student: Student): Promise<void> {
    const raw = PrismaStudentMapper.toPrisma(student);

    await this.prisma.student.create({
      data: raw,
    });
  }

  async update(student: Student): Promise<Student> {
    const raw = PrismaStudentMapper.toPrisma(student);

    const studentUpdated = await this.prisma.student.update({
      where: {
        registration: raw.registration,
      },
      include: {
        user: { include: { city: { include: { state: true } } } },
        curriculum: { include: { university: true, course: true } },
      },
      data: raw,
    });

    return PrismaStudentMapper.toDomain(studentUpdated);
  }

  async list(): Promise<Student[] | []> {
    const students = await this.prisma.student.findMany({
      include: {
        user: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        curriculum: {
          include: {
            course: true,
            university: true,
          },
        },
      },
    });

    return students.map(PrismaStudentMapper.toDomain);
  }

  async delete(studentId: string): Promise<void> {
    await this.prisma.student.delete({
      where: {
        id: studentId,
      },
    });
  }

  async findByEmailAndUserName(
    request: FindByEmailAndUserNameRequest,
  ): Promise<Student | null> {
    const { email, username } = request;
    const student = await this.prisma.student.findFirst({
      where: {
        OR: {
          user: {
            email,
            username,
          },
        },
      },
      include: {
        user: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        curriculum: {
          include: {
            course: true,
            university: true,
          },
        },
      },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }

  async findByUsername(username: string): Promise<Student | null> {
    const student = await this.prisma.student.findFirst({
      where: { user: { username } },
      include: {
        user: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        curriculum: {
          include: {
            course: true,
            university: true,
          },
        },
      },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }

  async findByUserId(userId: string): Promise<Student | null> {
    const student = await this.prisma.student.findFirst({
      where: { userId },
      include: {
        user: {
          include: {
            city: {
              include: {
                state: true,
              },
            },
          },
        },
        curriculum: {
          include: {
            course: true,
            university: true,
          },
        },
      },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }
}

export interface FindByEmailAndUserNameRequest {
  email: string;
  username: string;
}
