import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { CourseHistoryNotFound } from '../errors/course-history-not-found';

interface UpdateCourseHistoryRequest {
  id: string;
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
    const { courseHistory, id } = request;

    const courseHistoryFinded = await this.courseHistoriesRepository.findById(
      id,
    );

    if (!courseHistoryFinded) throw new CourseHistoryNotFound();

    const data = CourseHistory.create(
      { ...courseHistoryFinded._props, ...courseHistory },
      courseHistoryFinded.id,
    );

    const courseHistoryUpdated = await this.courseHistoriesRepository.update(
      data,
    );

    return {
      courseHistory: courseHistoryUpdated,
    };
  }
}
