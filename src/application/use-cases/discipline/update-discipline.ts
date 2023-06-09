import { Injectable } from '@nestjs/common';

import { Discipline } from '@application/entities/discipline/discipline';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';
import { DisciplineNotFound } from '../errors/discipline-not-found';

interface UpdateDisciplineRequest {
  discipline: Discipline;
}
interface UpdateDisciplineResponse {
  discipline: Discipline;
}

@Injectable()
export class UpdateDiscipline {
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(
    request: UpdateDisciplineRequest,
  ): Promise<UpdateDisciplineResponse> {
    const { discipline } = request;

    const disciplineFinded = await this.disciplinesRepository.findById(
      discipline.id.toString(),
    );

    if (!disciplineFinded) throw new DisciplineNotFound();

    const disciplineUpdated = await this.disciplinesRepository.update(
      discipline,
    );

    return {
      discipline: disciplineUpdated,
    };
  }
}
