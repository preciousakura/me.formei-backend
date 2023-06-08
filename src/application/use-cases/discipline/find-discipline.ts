import { Injectable } from '@nestjs/common';

import { Discipline } from '@application/entities/discipline/discipline';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';
import { DisciplineNotFound } from '../errors/discipline-not-found';

interface FindDisciplineRequest {
  disciplineId: string;
}
interface FindDisciplineResponse {
  discipline: Discipline;
}

@Injectable()
export class FindDiscipline {
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(
    request: FindDisciplineRequest,
  ): Promise<FindDisciplineResponse> {
    const { disciplineId } = request;
    const discipline = await this.disciplinesRepository.findById(disciplineId);

    if (!discipline) throw new DisciplineNotFound();

    return {
      discipline,
    };
  }
}
