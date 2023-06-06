import { NotFoundException } from '@nestjs/common';

export class AdminNotFound extends NotFoundException {
  constructor() {
    super('Admin not found.');
  }
}
