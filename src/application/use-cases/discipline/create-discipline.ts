import { Discipline } from '@application/entities/discipline/discipline'; // teste
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { Injectable } from '@nestjs/common';
import { CurriculumNotFound } from '../errors/curriculum-not-found';

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
  constructor(
    private disciplinesRepository: DisciplinesRepository,
    private curriculumsRepository: CurriculumsRepository,
  ) {}

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

    const curriculum = await this.curriculumsRepository.findById(curriculumId);

    if (!curriculum) {
      throw new CurriculumNotFound();
    }

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
