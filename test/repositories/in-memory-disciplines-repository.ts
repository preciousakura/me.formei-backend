import { Discipline } from '@application/entities/discipline/discipline';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

export class InMemoryDisciplinesRepository implements DisciplinesRepository {
  public disciplines: Discipline[] = [];

  async findById(disciplineId: string): Promise<Discipline | null> {
    const discipline = this.disciplines.find(
      (item) => item.id.toString() === disciplineId,
    );

    if (!discipline) {
      return null;
    }

    return discipline;
  }

  async findByCurriculum(curriculumId: string): Promise<Discipline[] | []> {
    const disciplinesSearched = this.disciplines.filter(
      (item) => item.curriculumId.toString() === curriculumId,
    );

    return disciplinesSearched;
  }

  // async findManyByAnyId(AnyId: string): Promise<Curriculum[]> {
  //   return this.universitys.filter((ciscipline) => ciscipline.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.universitys.filter((ciscipline) => ciscipline.AnyId === AnyId).length;
  // }

  async create(discipline: Discipline) {
    this.disciplines.push(discipline);
  }

  async update(discipline: Discipline): Promise<Discipline> {
    const index = this.disciplines.findIndex(
      (item) => item.id === discipline.id,
    );

    if (index >= 0) {
      this.disciplines[index] = discipline;
    }
    return this.disciplines[index];
  }

  async list(): Promise<Discipline[] | []> {
    return this.disciplines;
  }

  async delete(disciplineId: string): Promise<void> {
    const disciplinesIndex = this.disciplines.findIndex(
      (item) => item.id.toString() === disciplineId,
    );

    if (disciplinesIndex >= 0) {
      this.disciplines.splice(disciplinesIndex, 1);
    }
  }
}
