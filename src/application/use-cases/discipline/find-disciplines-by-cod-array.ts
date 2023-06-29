import { Injectable } from '@nestjs/common';

import { Discipline } from '@application/entities/discipline/discipline';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

interface FindDisciplineByCodArrayRequest {
  cods: string[];
}
interface FindDisciplineByCodArrayResponse {
  disciplines: Discipline[];
}

@Injectable()
export class FindDisciplineByCodArray {
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(
    request: FindDisciplineByCodArrayRequest,
  ): Promise<FindDisciplineByCodArrayResponse> {
    const { cods } = request;
    const disciplines = await this.disciplinesRepository.findByCodArray(cods);

    return {
      disciplines,
    };
  }
}
