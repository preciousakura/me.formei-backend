import { FindByEmailAndUserNameRequest } from '@infra/database/prisma/repositories/prisma-students-repository';
import { Admin } from '../entities/admin/admin';

export abstract class AdminsRepository {
  abstract create(admin: Admin): Promise<void>;
  abstract findById(adminId: string): Promise<Admin | null>;
  abstract update(admin: Admin): Promise<Admin>;
  abstract delete(adminId: string): Promise<void>;
  abstract list(): Promise<Admin[] | []>;
  abstract findByEmailAndUserName(
    request: FindByEmailAndUserNameRequest,
  ): Promise<Admin | null>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
