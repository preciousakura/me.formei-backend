import { NotFoundException } from '@nestjs/common';

export class DisciplineNotFound extends NotFoundException {
  constructor(override?: string) {
    if (override) {
      super(override);
    } else {
      super('Discipline not found.');
    }
  }
}
