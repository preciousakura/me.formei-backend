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
  prerequisites: string[];
  bibliography: string[];
  hours: number;
}

interface CreateDisciplineResponse {
  discipline: Discipline;
  error: boolean;
  cod?: string;
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
      prerequisites,
      bibliography,
      hours,
    } = request;
    let hasErrorPrerequite = false;
    const prerequisiteDisciplines: Discipline[] = [];
    const curriculum = await this.curriculumsRepository.findById(curriculumId);

    if (!curriculum) {
      throw new CurriculumNotFound();
    }
    for (const prerequisiteCod of prerequisites) {
      const discipline = await this.disciplinesRepository.findByCod(
        prerequisiteCod,
      );
      if (!discipline) {
        hasErrorPrerequite = true;
        return {
          discipline: null,
          error: hasErrorPrerequite,
          cod: cod,
        };
        // throw new DisciplineNotFound(
        //   'Could not find discipline of prerequisites',
        // );
      }
      prerequisiteDisciplines.push(discipline);
    }
    const discipline = Discipline.create({
      cod,
      optional,
      name,
      courseOutline,
      semester,
      description,
      curriculumId,
      prerequisiteDisciplines: prerequisiteDisciplines.map(
        (discipline) => discipline.cod,
      ),
      bibliography,
      hours,
    });

    await this.disciplinesRepository.create(discipline);

    return {
      discipline,
      error: null,
    };
  }
}
