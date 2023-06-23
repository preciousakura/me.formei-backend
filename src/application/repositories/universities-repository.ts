import { University } from '@application/entities/curriculum/university';
export abstract class UniversitiesRepository {
  abstract create(university: University): Promise<void>;
  abstract findById(universityId: string): Promise<University | null>;
  abstract update(university: University): Promise<University>;
  abstract delete(universityId: string): Promise<void>;
  abstract list(): Promise<University[]>;
  abstract findByState(state: string): Promise<University[]>;
  abstract findByCity(city: string): Promise<University[]>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
