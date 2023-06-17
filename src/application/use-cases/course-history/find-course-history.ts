import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { CourseHistoryNotFound } from '../errors/course-history-not-found';

interface FindCourseHistoryRequest {
  courseHistoryId: string;
}
interface FindCourseHistoryResponse {
  courseHistory: CourseHistory;
}

@Injectable()
export class FindCourseHistory {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(
    request: FindCourseHistoryRequest,
  ): Promise<FindCourseHistoryResponse> {
    const { courseHistoryId } = request;
    const courseHistory = await this.courseHistoriesRepository.findById(
      courseHistoryId,
    );

    if (!courseHistory) throw new CourseHistoryNotFound();

    return {
      courseHistory,
    };
  }
}
