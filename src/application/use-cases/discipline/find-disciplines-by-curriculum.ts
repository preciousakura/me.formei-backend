import { Injectable } from '@nestjs/common';

import { Discipline } from '@application/entities/discipline/discipline';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';
import { DisciplineNotFound } from '../errors/discipline-not-found';

interface FindDisciplinesByCurriculumRequest {
  curriculumId: string;
}
interface FindDisciplinesByCurriculumResponse {
  disciplines: Discipline[];
}

@Injectable()
export class FindDisciplinesByCurriculum {
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(
    request: FindDisciplinesByCurriculumRequest,
  ): Promise<FindDisciplinesByCurriculumResponse> {
    const { curriculumId } = request;
    const disciplines = await this.disciplinesRepository.findByCurriculum(
      curriculumId,
    );

    if (!disciplines) throw new DisciplineNotFound();

    return {
      disciplines,
    };
  }
}
