import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';

interface FindCourseHistoryRequest {
  studentRegistration: string;
}
interface FindCourseHistoryResponse {
  courseHistories: CourseHistory[];
}

@Injectable()
export class FindDisciplinesHistoryByStudentRegistration {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(
    request: FindCourseHistoryRequest,
  ): Promise<FindCourseHistoryResponse> {
    const { studentRegistration } = request;
    const courseHistories = await this.courseHistoriesRepository.findByStudent(
      studentRegistration,
    );

    return {
      courseHistories,
    };
  }
}
