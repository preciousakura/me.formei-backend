import { Injectable } from '@nestjs/common';

import { City } from '@application/entities/city/city';
import { CitiesRepository } from '@application/repositories/cities-repository';

import { PrismaCityMapper } from '../mappers/prisma-city-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCitiesRepository implements CitiesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(cityId: string): Promise<City | null> {
    const city = await this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
      include: {
        state: true,
      },
    });

    if (!city) {
      return null;
    }

    return PrismaCityMapper.toDomain(city);
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

  async create(city: City): Promise<void> {
    const raw = PrismaCityMapper.toPrisma(city);

    await this.prisma.city.create({
      data: raw,
    });
  }

  async save(city: City): Promise<void> {
    const raw = PrismaCityMapper.toPrisma(city);

    await this.prisma.city.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
