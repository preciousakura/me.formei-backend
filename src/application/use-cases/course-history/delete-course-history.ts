import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { CourseHistoryNotFound } from '../errors/course-history-not-found';

interface DeleteCourseHistoryResponse {
  courseHistory: CourseHistory;
}
interface DeleteCourseHistoryRequest {
  courseHistoryId: string;
}

@Injectable()
export class DeleteCourseHistory {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(
    request: DeleteCourseHistoryRequest,
  ): Promise<DeleteCourseHistoryResponse> {
    const courseHistory = await this.courseHistoriesRepository.findById(
      request.courseHistoryId,
    );

    if (!courseHistory) {
      throw new CourseHistoryNotFound();
    }

    await this.courseHistoriesRepository.delete(courseHistory.id.toString());

    return {
      courseHistory,
    };
  }
}
