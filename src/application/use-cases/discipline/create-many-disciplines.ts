import { Discipline } from '@application/entities/discipline/discipline'; // teste
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { Injectable } from '@nestjs/common';
import { CurriculumNotFound } from '../errors/curriculum-not-found';

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

export interface CreateDisciplineResponse {
  disciplines: Discipline[];
  feedback: Feedback;
}
export interface FeedbackDiscipline {
  cod?: string;
  prerequisitesCod?: string[];
}

export interface Feedback {
  error: {
    message: string;
    disciplines: FeedbackDiscipline[];
  };
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
    const feedback: Feedback = {
      error: {
        message: '',
        disciplines: [],
      },
    };
    for (const discipline of disciplines) {
      let hasErrorPrerequite = false;
      const prerequisiteDisciplines: Discipline[] = [];
      const curriculum = await this.curriculumsRepository.findById(
        curriculumId,
      );

      if (!curriculum) {
        throw new CurriculumNotFound();
      }
      let prerequisitesCod: string[] = [];
      for (const cod of discipline.prerequisites) {
        const disciplineFinded = await this.disciplinesRepository.findByCod(
          cod,
        );
        if (!disciplineFinded) {
          hasErrorPrerequite = true;
          const index = feedback.error.disciplines.findIndex(
            (disc) => disc.cod === discipline.cod,
          );
          prerequisitesCod = [
            ...prerequisitesCod,
            ...feedback.error.disciplines[index].prerequisitesCod,
          ];

          feedback.error.disciplines.push({
            cod: discipline.cod,
            prerequisitesCod: [...prerequisitesCod, cod],
          });
          // throw new DisciplineNotFound(
          //   'Could not find discipline of prerequisites',
          // );
        }
        prerequisiteDisciplines.push(disciplineFinded);
      }

      if (hasErrorPrerequite) {
        feedback.error.message =
          'Houve um problema com alguns codigos de prérequisito, disciplinas que não foram cadastradas corretamente:';
        continue;
      }

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
    }

    await this.disciplinesRepository.createMany(disciplinesData);

    return {
      disciplines: disciplinesData,
      feedback,
    };
  }
}
