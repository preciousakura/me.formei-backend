import { Injectable } from '@nestjs/common';
import { Course } from 'src/application/entities/curriculum/course';
import { CoursesRepository } from 'src/application/repositories/courses-repository';
import { PrismaCourseMapper } from '../mappers/prisma-course-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCoursesRepository implements CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(courseId: string): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        curriculums: true,
      },
    });

    if (!course) {
      return null;
    }

    return PrismaCourseMapper.toDomain(course);
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

  async create(course: Course): Promise<void> {
    const raw = PrismaCourseMapper.toPrisma(course);

    await this.prisma.course.create({
      data: raw,
    });
  }

  async save(course: Course): Promise<void> {
    const raw = PrismaCourseMapper.toPrisma(course);

    await this.prisma.course.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async list(): Promise<Course[] | []> {
    const courses = await this.prisma.course.findMany();

    return courses.map(PrismaCourseMapper.toDomain);
  }

  async delete(courseId: string): Promise<void> {
    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });
  }
}
