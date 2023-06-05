import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';

export class InMemoryUniversitiesRepository implements UniversitiesRepository {
  public universities: University[] = [];

  async findById(universityId: string): Promise<University | null> {
    const university = this.universities.find(
      (item) => item.id.toString() === universityId,
    );

    if (!university) {
      return null;
    }

    return university;
  }

  // async findManyByAnyId(AnyId: string): Promise<Curriculum[]> {
  //   return this.universitys.filter((university) => university.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.universitys.filter((university) => university.AnyId === AnyId).length;
  // }

  async create(university: University) {
    this.universities.push(university);
  }

  async update(university: University): Promise<University> {
    const index = this.universities.findIndex(
      (item) => item.id === university.id,
    );

    if (index >= 0) {
      this.universities[index] = university;
    }
    return this.universities[index];
  }

  async list(): Promise<University[] | []> {
    return this.universities;
  }

  async delete(universityId: string): Promise<void> {
    const universitiesIndex = this.universities.findIndex(
      (item) => item.id.toString() === universityId,
    );

    if (universitiesIndex >= 0) {
      this.universities.splice(universitiesIndex, 1);
    }
  }
}
