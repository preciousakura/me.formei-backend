import { NotFoundException } from '@nestjs/common';

export class UniversityNotFound extends NotFoundException {
  constructor() {
    super('University not found.');
  }
}
