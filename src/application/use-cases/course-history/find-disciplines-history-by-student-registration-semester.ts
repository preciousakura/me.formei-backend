import { Injectable } from '@nestjs/common';

import { CourseHistory } from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';

interface FindCourseHistoryRequest {
  semester: number;
  studentRegistration: string;
}
interface FindCourseHistoryResponse {
  courseHistories: CourseHistory[];
}

@Injectable()
export class FindDisciplinesHistoryByStudentRegistrationBySemester {
  constructor(private courseHistoriesRepository: CourseHistoriesRepository) {}

  async execute(
    request: FindCourseHistoryRequest,
  ): Promise<FindCourseHistoryResponse> {
    const { semester, studentRegistration } = request;
    const courseHistories =
      await this.courseHistoriesRepository.findByStudentAndSemester({
        semester,
        studentRegistration,
      });

    return {
      courseHistories,
    };
  }
}
