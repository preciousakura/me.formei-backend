import { Course } from '@application/entities/curriculum/course';
import { ApiProperty } from '@nestjs/swagger';

export class CourseViewModel {
  @ApiProperty()
  static toHTTP(course: Course) {
    const { id, name } = course;

    return {
      id: id.toValue(),
      name,
    };
  }
}
