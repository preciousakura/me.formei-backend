import { Curriculum } from '@application/entities/curriculum/curriculum';
import {
  CurriculumsRepository,
  findByUniversityIdAndCurriculumIdRequest,
} from '@application/repositories/curriculums-repository';

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

  async findByUniversityIdAndCurriculumId(
    request: findByUniversityIdAndCurriculumIdRequest,
  ): Promise<Curriculum> {
    const { universityId, curriculumId } = request;
    const curriculum = this.curriculums.find(
      (item) =>
        item.university.id.toString() === universityId &&
        item.id.toString() == curriculumId,
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

  async update(curriculum: Curriculum): Promise<Curriculum> {
    const index = this.curriculums.findIndex(
      (item) => item.id === curriculum.id,
    );

    if (index >= 0) {
      this.curriculums[index] = curriculum;
    }

    return this.curriculums[index];
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

  async findByUniversityId(universityId: string): Promise<Curriculum[]> {
    const curriculums = this.curriculums.filter(
      (item) => item.university.id.toString() === universityId,
    );

    return curriculums;
  }
}
