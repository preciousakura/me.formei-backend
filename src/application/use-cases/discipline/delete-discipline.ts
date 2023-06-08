import { Injectable } from '@nestjs/common';

import { Discipline } from '@application/entities/discipline/discipline';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';
import { DisciplineNotFound } from '../errors/discipline-not-found';

interface DeleteDisciplineResponse {
  discipline: Discipline;
}
interface DeleteDisciplineRequest {
  disciplineId: string;
}

@Injectable()
export class DeleteDiscipline {
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(
    request: DeleteDisciplineRequest,
  ): Promise<DeleteDisciplineResponse> {
    const discipline = await this.disciplinesRepository.findById(
      request.disciplineId,
    );

    if (!discipline) {
      throw new DisciplineNotFound();
    }

    await this.disciplinesRepository.delete(discipline.id.toString());

    return {
      discipline,
    };
  }
}
