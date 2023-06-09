import { Injectable } from '@nestjs/common';
import { Discipline } from 'src/application/entities/discipline/discipline';
import { DisciplinesRepository } from 'src/application/repositories/disciplines-repository';
import { PrismaDisciplineMapper } from '../mappers/prisma-discipline-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaDisciplinesRepository implements DisciplinesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(disciplineId: string): Promise<Discipline | null> {
    const discipline = await this.prisma.discipline.findUnique({
      where: {
        id: disciplineId,
      },
      /*  include: {
        curriculum: {
          include: {
            course: true,
            university: true,
          },
        },
      }, */
    });

    if (!discipline) {
      return null;
    }

    return PrismaDisciplineMapper.toDomain(discipline);
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

  async create(discipline: Discipline): Promise<void> {
    const raw = PrismaDisciplineMapper.toPrisma(discipline);

    await this.prisma.discipline.create({
      data: raw,
    });
  }

  async list(): Promise<Discipline[] | []> {
    const disciplines = await this.prisma.discipline.findMany();

    return disciplines.map(PrismaDisciplineMapper.toDomain);
  }

  async delete(disciplineId: string): Promise<void> {
    await this.prisma.discipline.delete({
      where: {
        id: disciplineId,
      },
    });
  }

  async update(discipline: Discipline): Promise<Discipline> {
    const raw = PrismaDisciplineMapper.toPrisma(discipline);

    const disciplineFinded = await this.prisma.discipline.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return PrismaDisciplineMapper.toDomain(disciplineFinded);
  }
}
