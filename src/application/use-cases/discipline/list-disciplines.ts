import { Injectable } from '@nestjs/common';

import { Discipline } from '@application/entities/discipline/discipline';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

interface ListDisciplinesResponse {
  disciplines: Discipline[];
}

@Injectable()
export class ListDisciplines {
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(): Promise<ListDisciplinesResponse> {
    const disciplines = await this.disciplinesRepository.list();

    return {
      disciplines,
    };
  }
}
