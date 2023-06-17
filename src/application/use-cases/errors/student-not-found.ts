import { NotFoundException } from '@nestjs/common';

export class StudentNotFound extends NotFoundException {
  constructor() {
    super('Student not found.');
  }
}
