import { Curriculum } from '@application/entities/curriculum/curriculum';

export abstract class CurriculumsRepository {
  abstract create(curriculum: Curriculum): Promise<void>;
  abstract findById(curriculumId: string): Promise<Curriculum | null>;
  abstract save(curriculum: Curriculum): Promise<void>;
  abstract delete(curriculumId: string): Promise<void>;
  abstract list(): Promise<Curriculum[] | []>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
