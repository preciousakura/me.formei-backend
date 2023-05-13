import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';

export class InMemoryCurriculumsRepository implements CurriculumsRepository {
  public curriculums: Curriculum[] = [];

  async findById(curriculumId: string): Promise<Curriculum | null> {
    const curriculum = this.curriculums.find(
      (item) => item.id.toString() === curriculumId,
    );

    if (!curriculum) {
      return null;
    }

    return curriculum;
  }

  // async findManyByAnyId(AnyId: string): Promise<Curriculum[]> {
  //   return this.curriculums.filter((curriculum) => curriculum.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.curriculums.filter((curriculum) => curriculum.AnyId === AnyId).length;
  // }

  async create(curriculum: Curriculum) {
    this.curriculums.push(curriculum);
  }

  async save(curriculum: Curriculum): Promise<void> {
    const index = this.curriculums.findIndex(
      (item) => item.id === curriculum.id,
    );

    if (index >= 0) {
      this.curriculums[index] = curriculum;
    }
  }

  async list(): Promise<Curriculum[] | []> {
    return this.curriculums;
  }

  async delete(curriculumId: string): Promise<void> {
    const curriculumsIndex = this.curriculums.findIndex(
      (item) => item.id.toString() === curriculumId,
    );

    if (curriculumsIndex >= 0) {
      this.curriculums.splice(curriculumsIndex, 1);
    }
  }
}
