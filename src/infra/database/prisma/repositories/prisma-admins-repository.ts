import { Injectable } from '@nestjs/common';

import { Admin } from 'src/application/entities/admin/admin';
import { AdminsRepository } from 'src/application/repositories/admins-repository';
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAdminsRepository implements AdminsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(adminId: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: adminId,
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
      },
    });

    if (!admin) {
      return null;
    }

    return PrismaAdminMapper.toDomain(admin);
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

  async create(admin: Admin): Promise<void> {
    const raw = PrismaAdminMapper.toPrisma(admin);

    await this.prisma.admin.create({
      data: raw,
    });
  }

  async save(admin: Admin): Promise<void> {
    const raw = PrismaAdminMapper.toPrisma(admin);

    await this.prisma.admin.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
  async list(): Promise<Admin[] | []> {
    const admin = await this.prisma.admin.findMany({
      include: { user: true },
    });

    return admin.map(PrismaAdminMapper.toDomain);
  }

  async delete(adminId: string): Promise<void> {
    await this.prisma.admin.delete({
      where: {
        id: adminId,
      },
    });
  }
}
