import { Injectable } from '@nestjs/common';

import { Course } from '@application/entities/curriculum/course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { CourseNotFound } from '../errors/course-not-found';

interface FindCourseRequest {
  courseId: string;
}
interface FindCourseResponse {
  course: Course;
}

@Injectable()
export class FindCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: FindCourseRequest): Promise<FindCourseResponse> {
    const { courseId } = request;
    const course = await this.coursesRepository.findById(courseId);

    if (!course) throw new CourseNotFound();

    return {
      course,
    };
  }
}
