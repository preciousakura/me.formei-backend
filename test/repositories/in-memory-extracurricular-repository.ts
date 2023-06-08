import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';

export class InMemoryExtraCurricularRepository
  implements ExtraCurricularRepository
{
  public extraCurricularActivities: ExtraCurricular[] = [];

  async findById(extraCurricularId: string): Promise<ExtraCurricular | null> {
    const exc = this.extraCurricularActivities.find(
      (item) => item.id.toString() === extraCurricularId,
    );

    if (!exc) {
      return null;
    }

    return exc;
  }

  async findByStudentRegistration(
    studentRegistration: string,
  ): Promise<ExtraCurricular[] | []> {
    const exc = this.extraCurricularActivities.filter(
      (item) => item.studentRegistration.toString() === studentRegistration,
    );

    if (!exc) {
      return null;
    }

    return exc;
  }

  // async findManyByAnyId(AnyId: string): Promise<ExtraCurricular[]> {
  //   return this.extraCurricularActivities.filter((curriculum) => curriculum.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.extraCurricularActivities.filter((curriculum) => curriculum.AnyId === AnyId).length;
  // }

  async create(extraCurricular: ExtraCurricular) {
    this.extraCurricularActivities.push(extraCurricular);
  }

  async update(extraCurricular: ExtraCurricular): Promise<ExtraCurricular> {
    const index = this.extraCurricularActivities.findIndex(
      (item) => item.id === extraCurricular.id,
    );

    if (index >= 0) {
      this.extraCurricularActivities[index] = extraCurricular;
      return this.extraCurricularActivities[index];
    }
  }

  async list(): Promise<ExtraCurricular[] | []> {
    return this.extraCurricularActivities;
  }

  async delete(extraCurricularId: string): Promise<void> {
    const index = this.extraCurricularActivities.findIndex(
      (item) => item.id.toString() === extraCurricularId,
    );

    if (index >= 0) {
      this.extraCurricularActivities.splice(index, 1);
    }
  }
}
