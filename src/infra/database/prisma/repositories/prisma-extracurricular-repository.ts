import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { FindByEmailAndUserNameRequest } from './prisma-students-repository';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';
import { PrismaExtraCurricularMapper } from '../mappers/prisma-extracurricular-mapper';
import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';

@Injectable()
export class PrismaExtraCurricularRepository implements ExtraCurricularRepository {
  constructor(private prisma: PrismaService) {}

  async findById(extraCurricularId: string): Promise<ExtraCurricular | null> {
    const exc = await this.prisma.extraCurricularActivitiesHistory.findUnique({
      where: {
        id: extraCurricularId,
      },
    });

    if (!exc) {
      return null;
    }

    return PrismaExtraCurricularMapper.toDomain(exc);
  }


  async create(exc: ExtraCurricular): Promise<void> {
    const raw = PrismaExtraCurricularMapper.toPrisma(exc);

    await this.prisma.extraCurricularActivitiesHistory.create({
      data: raw,
    });
  }

  async update(exc: ExtraCurricular): Promise<ExtraCurricular> {
    const raw = PrismaExtraCurricularMapper.toPrisma(exc);

    const excFinded = await this.prisma.extraCurricularActivitiesHistory.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return PrismaExtraCurricularMapper.toDomain(excFinded);
  }
  async list(): Promise<ExtraCurricular[] | []> {
    const exc = await this.prisma.extraCurricularActivitiesHistory.findMany({
    });

    return exc.map(PrismaExtraCurricularMapper.toDomain);
  }

  async delete(extraCurricularId: string): Promise<void> {
    await this.prisma.extraCurricularActivitiesHistory.delete({
      where: {
        id: extraCurricularId,
      },
    });
  }

  async findByStudentRegistration(studentRegistration: string): Promise<ExtraCurricular[] | []> {
    const exc = await this.prisma.extraCurricularActivitiesHistory.findMany({
      where: {
        studentRegistration: studentRegistration,
      },
    });

    if (!exc) {
      return null;
    }

    return exc.map(PrismaExtraCurricularMapper.toDomain);
  }
}
   
   