import { Injectable } from '@nestjs/common';

import { State } from '@application/entities/state/state';
import { StatesRepository } from '@application/repositories/states-repository';

import { PrismaStateMapper } from '../mappers/prisma-state-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaStatesRepository implements StatesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(stateId: string): Promise<State | null> {
    const state = await this.prisma.state.findUnique({
      where: {
        id: stateId,
      },
    });

    if (!state) {
      return null;
    }

    return PrismaStateMapper.toDomain(state);
  }

  // async findManyByAnyId(anyId: string): Promise<Admin[]> {
  //   const students = await this.prisma.student.findMany({
  //     where: {
  //       anyId,
  //     },
  //   });

  //   return students.map(PrismaAdminMapper.toDomain);
  // }

  // async countManyByAnyId(anyId: string): Promise<number> {
  //   const count = await this.prisma.student.count({
  //     where: {
  //       anyId,
  //     },
  //   });

  //   return count;
  // }

  async create(state: State): Promise<void> {
    const raw = PrismaStateMapper.toPrisma(state);

    await this.prisma.state.create({
      data: raw,
    });
  }

  async save(state: State): Promise<void> {
    const raw = PrismaStateMapper.toPrisma(state);

    await this.prisma.state.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async list(): Promise<State[] | []> {
    const states = await this.prisma.state.findMany();

    return states.map(PrismaStateMapper.toDomain);
  }

  async delete(stateId: string): Promise<void> {
    await this.prisma.state.delete({
      where: {
        id: stateId,
      },
    });
  }
}
