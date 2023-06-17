import { Injectable } from '@nestjs/common';

import { Course } from '@application/entities/curriculum/course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { CourseNotFound } from '../errors/course-not-found';

interface DeleteCourseResponse {
  course: Course;
}
interface DeleteCourseRequest {
  courseId: string;
}

@Injectable()
export class DeleteCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: DeleteCourseRequest): Promise<DeleteCourseResponse> {
    const course = await this.coursesRepository.findById(request.courseId);

    if (!course) {
      throw new CourseNotFound();
    }

    await this.coursesRepository.delete(course.id.toString());

    return {
      course,
    };
  }
}
