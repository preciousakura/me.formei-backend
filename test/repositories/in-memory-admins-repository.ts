import { Admin } from '@application/entities/admin/admin';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { FindByEmailAndUserNameRequest } from '@infra/database/prisma/repositories/prisma-students-repository';

export class InMemoryAdminsRepository implements AdminsRepository {
  public admins: Admin[] = [];

  async findById(adminId: string): Promise<Admin | null> {
    const admin = this.admins.find(
      (item) => item.adminId.toString() === adminId,
    );

    if (!admin) {
      return null;
    }

    return admin;
  }

  // async findManyByAnyId(AnyId: string): Promise<Admin[]> {
  //   return this.admins.filter((admin) => admin.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.admins.filter((admin) => admin.AnyId === AnyId).length;
  // }

  async create(admin: Admin) {
    this.admins.push(admin);
  }

  async update(admin: Admin): Promise<Admin> {
    const index = this.admins.findIndex(
      (item) => item.adminId.toString() === admin.adminId.toString(),
    );

    if (index >= 0) {
      this.admins[index] = admin;
    }

    return this.admins[index];
  }

  async list(): Promise<Admin[] | []> {
    return this.admins;
  }

  async delete(adminId: string): Promise<void> {
    const index = this.admins.findIndex(
      (item) => item.adminId.toString() === adminId,
    );

    if (index >= 0) {
      this.admins.splice(index, 1);
    }
  }

  async findByEmailOrUserName(
    request: FindByEmailAndUserNameRequest,
  ): Promise<Admin | null> {
    const { email, username } = request;
    const admin = this.admins.find(
      (item) => item.email === email || item.username == username,
    );
    if (!admin) {
      return null;
    }

    return admin;
  }

  async findByUsername(username: string): Promise<Admin | null> {
    const admin = this.admins.find((item) => item.username == username);
    if (!admin) {
      return null;
    }

    return admin;
  }

  async findByUserId(userId: string): Promise<Admin | null> {
    const admin = this.admins.find((item) => item.id.toString() == userId);
    if (!admin) {
      return null;
    }

    return admin;
  }
}
