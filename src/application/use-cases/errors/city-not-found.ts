import { NotFoundException } from '@nestjs/common';

export class CityNotFound extends NotFoundException {
  constructor() {
    super('City not found.');
  }
}
