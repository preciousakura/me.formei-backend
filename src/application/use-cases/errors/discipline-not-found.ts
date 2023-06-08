import { NotFoundException } from '@nestjs/common';

export class DisciplineNotFound extends NotFoundException {
  constructor() {
    super('Discipline not found.');
  }
}
