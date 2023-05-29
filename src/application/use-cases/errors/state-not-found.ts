import { NotFoundException } from '@nestjs/common';

export class StateNotFound extends NotFoundException {
  constructor() {
    super('State not found.');
  }
}
