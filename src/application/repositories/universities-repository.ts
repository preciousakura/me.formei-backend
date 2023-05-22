import { University } from '@application/entities/curriculum/university';
export abstract class UniversitiesRepository {
  abstract create(university: University): Promise<void>;
  abstract findById(universityId: string): Promise<University | null>;
  abstract save(university: University): Promise<void>;
  abstract delete(universityId: string): Promise<void>;
  abstract list(): Promise<University[] | []>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
