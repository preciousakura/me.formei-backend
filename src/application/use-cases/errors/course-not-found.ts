import { NotFoundException } from '@nestjs/common';

export class CourseNotFound extends NotFoundException {
  constructor() {
    super('Course not found.');
  }
}
