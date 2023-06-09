import { Discipline } from '@application/entities/discipline/discipline'; // teste
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

import { Injectable } from '@nestjs/common';

interface CreateDisciplineRequest {
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  curriculumId: string;
}

interface CreateDisciplineResponse {
  discipline: Discipline;
}

@Injectable()
export class CreateDiscipline {
  curriculumsRepository: any;
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(
    request: CreateDisciplineRequest,
  ): Promise<CreateDisciplineResponse> {
    const {
      cod,
      optional,
      name,
      courseOutline,
      semester,
      description,
      curriculumId,
    } = request;

    const discipline = Discipline.create({
      cod,
      optional,
      name,
      courseOutline,
      semester,
      description,
      curriculumId,
      prerequisiteDisciplines: [],
    });

    await this.disciplinesRepository.create(discipline);

    return {
      discipline,
    };
  }
}
