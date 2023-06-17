import { CourseHistory } from '@application/entities/course-history/course-history';
import {
  CourseHistoriesRepository,
  FindByStatusAndStudent,
  FindByStudentAndSemester,
  FindByStudentAndSemesterAndDiscipline,
} from '@application/repositories/course-histories-repository';
import { Injectable } from '@nestjs/common';
import { PrismaCourseHistoryMapper } from '../mappers/prisma-course-history-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCourseHistoryRepository
  implements CourseHistoriesRepository
{
  constructor(private prisma: PrismaService) {}
  async findByStudent(
    studentRegistration: string,
  ): Promise<CourseHistory[] | []> {
    const courseHistory = await this.prisma.courseHistory.findMany({
      where: {
        studentRegistration,
      },
      include: {
        discipline: { include: { prerequisitesDisciplines: true } },
      },
    });

    return courseHistory.map(PrismaCourseHistoryMapper.toDomain);
  }

  async findById(courseHistoryId: string): Promise<CourseHistory> {
    const courseHistory = await this.prisma.courseHistory.findUnique({
      where: {
        id: courseHistoryId,
      },
      include: {
        discipline: { include: { prerequisitesDisciplines: true } },
      },
    });

    if (!courseHistory) {
      return null;
    }

    return PrismaCourseHistoryMapper.toDomain(courseHistory);
  }
  async findByStudentAndSemesterAndDiscipline(
    req: FindByStudentAndSemesterAndDiscipline,
  ): Promise<CourseHistory> {
    const { disciplineId, semester, studentRegistration } = req;
    const courseHistory = await this.prisma.courseHistory.findFirst({
      where: {
        disciplineId,
        semester,
        studentRegistration,
      },
      include: {
        discipline: { include: { prerequisitesDisciplines: true } },
      },
    });

    if (!courseHistory) {
      return null;
    }

    return PrismaCourseHistoryMapper.toDomain(courseHistory);
  }

  async findByStudentAndSemester(
    req: FindByStudentAndSemester,
  ): Promise<CourseHistory[] | []> {
    const { semester, studentRegistration } = req;
    const courseHistories = await this.prisma.courseHistory.findMany({
      where: {
        semester,
        studentRegistration,
      },
      include: {
        discipline: { include: { prerequisitesDisciplines: true } },
      },
    });

    if (!courseHistories) {
      return null;
    }

    return courseHistories.map(PrismaCourseHistoryMapper.toDomain);
  }

  async findByStatusAndStudent(
    request: FindByStatusAndStudent,
  ): Promise<CourseHistory[] | []> {
    const { status, studentRegistration } = request;
    const courseHistory = await this.prisma.courseHistory.findMany({
      where: {
        studentRegistration,
        status,
      },
    });

    return courseHistory.map(PrismaCourseHistoryMapper.toDomain);
  }

  async create(courseHistory: CourseHistory): Promise<void> {
    const raw = PrismaCourseHistoryMapper.toPrisma(courseHistory);
    await this.prisma.courseHistory.create({
      data: raw,
    });
  }

  async update(courseHistory: CourseHistory): Promise<CourseHistory> {
    const raw = PrismaCourseHistoryMapper.toPrisma(courseHistory);

    const courseHistoryFinded = await this.prisma.courseHistory.update({
      where: {
        id: raw.id,
      },
      include: {
        discipline: { include: { prerequisitesDisciplines: true } },
      },
      data: raw,
    });

    return PrismaCourseHistoryMapper.toDomain(courseHistoryFinded);
  }
  async delete(courseHistoryId: string): Promise<void> {
    await this.prisma.courseHistory.delete({
      where: {
        id: courseHistoryId,
      },
    });
  }
  async list(): Promise<[] | CourseHistory[]> {
    const courseHistories = await this.prisma.courseHistory.findMany({
      include: {
        discipline: {
          include: {
            prerequisitesDisciplines: true,
          },
        },
      },
    });
    return courseHistories.map(PrismaCourseHistoryMapper.toDomain);
  }
}
