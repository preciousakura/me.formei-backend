import { Admin } from '../entities/admin/admin';

export abstract class AdminsRepository {
  abstract create(admin: Admin): Promise<void>;
  abstract findById(adminId: string): Promise<Admin | null>;
  abstract save(admin: Admin): Promise<void>;
  abstract delete(adminId: string): Promise<void>;
  abstract list(): Promise<Admin[] | []>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
