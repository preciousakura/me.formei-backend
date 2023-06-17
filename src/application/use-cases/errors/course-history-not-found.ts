import { NotFoundException } from '@nestjs/common';

export class CourseHistoryNotFound extends NotFoundException {
  constructor() {
    super('CourseHistory not found.');
  }
}
