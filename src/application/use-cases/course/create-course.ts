import { Injectable } from '@nestjs/common';

import { Course } from '@application/entities/curriculum/course';
import { CoursesRepository } from '@application/repositories/courses-repository';

interface CreateCourseRequest {
  name: string;
}

interface CreateCourseResponse {
  course: Course;
}

@Injectable()
export class CreateCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: CreateCourseRequest): Promise<CreateCourseResponse> {
    const { name } = request;

    const course = Course.create({
      name,
    });

    await this.coursesRepository.create(course);

    return {
      course,
    };
  }
}
