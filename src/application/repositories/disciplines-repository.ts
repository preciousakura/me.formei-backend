import { Discipline } from '@application/entities/discipline/discipline';
export abstract class DisciplinesRepository {
  abstract create(discipline: Discipline): Promise<void>;
  abstract createMany(disciplines: Discipline[]): Promise<void>;
  abstract findById(disciplineId: string): Promise<Discipline | null>;
  abstract findByCod(cod: string): Promise<Discipline | null>;
  abstract findByCodArray(cods: string[]): Promise<Discipline[] | null>;
  abstract update(discipline: Discipline): Promise<Discipline>;
  abstract delete(disciplineId: string): Promise<void>;
  abstract list(): Promise<Discipline[] | []>;
  abstract findByCurriculum(curriculumId: string): Promise<Discipline[] | []>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
