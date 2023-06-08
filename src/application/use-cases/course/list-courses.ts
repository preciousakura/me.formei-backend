import { Injectable } from '@nestjs/common';

import { Course } from '@application/entities/curriculum/course';
import { CoursesRepository } from '@application/repositories/courses-repository';

interface ListCoursesResponse {
  courses: Course[];
}

@Injectable()
export class ListCourses {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(): Promise<ListCoursesResponse> {
    const courses = await this.coursesRepository.list();

    return {
      courses,
    };
  }
}
