import { Injectable } from '@nestjs/common';

import { Course } from '@application/entities/curriculum/course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { UpdateCourseBody } from '@infra/http/dto/course/update-course.dto';
import { CourseNotFound } from '../errors/course-not-found';

type UpdateCourseRequest = {
  id: string;
  course: UpdateCourseBody;
};
interface UpdateCourseResponse {
  course: Course;
}

@Injectable()
export class UpdateCourse {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    const { course, id } = request;

    const courseFinded = await this.coursesRepository.findById(id);

    if (!courseFinded) throw new CourseNotFound();

    const data = Course.create(
      { ...courseFinded._props, ...course },
      courseFinded.id,
    );

    const courseUpdated = await this.coursesRepository.update(data);

    return {
      course: courseUpdated,
    };
  }
}
