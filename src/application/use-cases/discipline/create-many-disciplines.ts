import { Discipline } from '@application/entities/discipline/discipline'; // teste
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { Injectable } from '@nestjs/common';
import { CurriculumNotFound } from '../errors/curriculum-not-found';
import { DisciplineNotFound } from '../errors/discipline-not-found';

interface CreateDiscipline {
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  prerequisites: string[];
  bibliography: string[];
}

interface CreateDisciplineRequest {
  disciplines: CreateDiscipline[];
  curriculumId: string;
}

interface CreateDisciplineResponse {
  disciplines: Discipline[];
}

@Injectable()
export class CreateManyDiscipline {
  constructor(
    private disciplinesRepository: DisciplinesRepository,
    private curriculumsRepository: CurriculumsRepository,
  ) {}

  async execute(
    request: CreateDisciplineRequest,
  ): Promise<CreateDisciplineResponse> {
    const { disciplines, curriculumId } = request;
    const disciplinesData: Discipline[] = [];
    disciplines.forEach(async (discipline) => {
      const prerequisiteDisciplines: Discipline[] = [];
      const curriculum = await this.curriculumsRepository.findById(
        curriculumId,
      );

      if (!curriculum) {
        throw new CurriculumNotFound();
      }

      discipline.prerequisites.forEach(async (cod) => {
        const disciplineFinded = await this.disciplinesRepository.findByCod(
          cod,
        );
        if (!disciplineFinded) {
          throw new DisciplineNotFound(
            'Could not find discipline of prerequisites',
          );
        }
        prerequisiteDisciplines.push(disciplineFinded);
      });

      const disciplineInstancied = Discipline.create({
        cod: discipline.cod,
        optional: discipline.optional,
        name: discipline.name,
        courseOutline: discipline.courseOutline,
        semester: discipline.semester,
        description: discipline.description,
        curriculumId: curriculumId,
        prerequisiteDisciplines: prerequisiteDisciplines.map(
          (discipline) => discipline.cod,
        ),
        bibliography: discipline.bibliography,
      });
      disciplinesData.push(disciplineInstancied);
    });

    await this.disciplinesRepository.createMany(disciplinesData);

    return {
      disciplines: disciplinesData,
    };
  }
}
