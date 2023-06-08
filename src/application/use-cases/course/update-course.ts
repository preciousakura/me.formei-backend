import { Injectable } from '@nestjs/common';

import { Course } from '@application/entities/curriculum/course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { CourseNotFound } from '../errors/course-not-found';

interface UpdateCourseRequest {
  course: Course;
}
interface UpdateCourseResponse {
  course: Course;
}

@Injectable()
export class UpdateCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    const { course } = request;

    const courseFinded = await this.coursesRepository.findById(
      course.id.toString(),
    );

    if (!courseFinded) throw new CourseNotFound();

    const courseUpdated = await this.coursesRepository.update(course);

    return {
      course: courseUpdated,
    };
  }
}
