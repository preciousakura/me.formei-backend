import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { Discipline } from '@application/entities/discipline/discipline';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

interface ListCourseHistoriesResponse {
  disciplinesTodo: Discipline[];
}

interface Request {
  curriculumId: string;
  studentRegistration: string;
}

@Injectable()
export class ListDisciplinesHistoryTodo {
  constructor(
    private courseHistoriesRepository: CourseHistoriesRepository,
    private disciplinesRepository: DisciplinesRepository,
  ) {}

  async execute(req: Request): Promise<ListCourseHistoriesResponse> {
    const { curriculumId, studentRegistration } = req;
    const disciplinesByCurriculum =
      await this.disciplinesRepository.findByCurriculum(curriculumId);

    const disciplinesObrigatorias = disciplinesByCurriculum.filter(
      (discipline: Discipline) => discipline.optional === false,
    );

    const courseHistories = await this.courseHistoriesRepository.findByStudent(
      studentRegistration,
    );

    const disciplinesDone = courseHistories.map(
      (courseHistory: CourseHistory) => courseHistory.discipline,
    );

    const disciplinesTodo = disciplinesObrigatorias.filter(
      (discipline) => !disciplinesDone.includes(discipline),
    );

    return {
      disciplinesTodo,
    };
  }
}
