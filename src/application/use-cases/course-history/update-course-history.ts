import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { CourseHistoryNotFound } from '../errors/course-history-not-found';

interface UpdateCourseHistoryRequest {
  courseHistory: CourseHistory;
}
interface UpdateCourseHistoryResponse {
  courseHistory: CourseHistory;
}

@Injectable()
export class UpdateCourseHistory {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(
    request: UpdateCourseHistoryRequest,
  ): Promise<UpdateCourseHistoryResponse> {
    const { courseHistory } = request;

    const courseHistoryFinded = await this.courseHistoriesRepository.findById(
      courseHistory.id.toString(),
    );

    if (!courseHistoryFinded) throw new CourseHistoryNotFound();

    const courseHistoryUpdated = await this.courseHistoriesRepository.update(
      courseHistory,
    );

    return {
      courseHistory: courseHistoryUpdated,
    };
  }
}
