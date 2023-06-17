import { Injectable } from '@nestjs/common';

import {
  CourseHistory,
  StatusType,
} from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';

interface FindCourseHistoryRequest {
  status: StatusType;
  studentRegistration: string;
}
interface FindCourseHistoryResponse {
  courseHistory: CourseHistory[];
}

@Injectable()
export class FindCourseHistoryByStatusAndStudentRegistration {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(
    request: FindCourseHistoryRequest,
  ): Promise<FindCourseHistoryResponse> {
    const { status, studentRegistration } = request;
    const courseHistory =
      await this.courseHistoriesRepository.findByStatusAndStudent({
        studentRegistration,
        status,
      });

    return {
      courseHistory,
    };
  }
}
