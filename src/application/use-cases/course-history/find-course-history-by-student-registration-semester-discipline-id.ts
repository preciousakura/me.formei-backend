import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { CourseHistoryNotFound } from '../errors/course-history-not-found';

interface FindCourseHistoryRequest {
  disciplineId: string;
  semester: number;
  studentRegistration: string;
}
interface FindCourseHistoryResponse {
  courseHistory: CourseHistory;
}

@Injectable()
export class FindCourseHistoryByStudentRegistrationBySemesterByDisciplineId {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(
    request: FindCourseHistoryRequest,
  ): Promise<FindCourseHistoryResponse> {
    const { disciplineId, semester, studentRegistration } = request;
    const courseHistory =
      await this.courseHistoriesRepository.findByStudentAndSemesterAndDiscipline(
        {
          disciplineId,
          semester,
          studentRegistration,
        },
      );

    if (!courseHistory) throw new CourseHistoryNotFound();

    return {
      courseHistory,
    };
  }
}
