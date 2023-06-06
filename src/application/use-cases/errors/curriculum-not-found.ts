import { NotFoundException } from '@nestjs/common';

export class CurriculumNotFound extends NotFoundException {
  constructor() {
    super('Curriculum not found.');
  }
}
