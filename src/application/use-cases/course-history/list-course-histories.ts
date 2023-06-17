import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';

interface ListCourseHistoriesResponse {
  courseHistories: CourseHistory[];
}

@Injectable()
export class ListCourseHistories {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(): Promise<ListCourseHistoriesResponse> {
    const courseHistories = await this.courseHistoriesRepository.list();

    return {
      courseHistories,
    };
  }
}
