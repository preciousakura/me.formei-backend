import { ConflictException } from '@nestjs/common';

export class UserAlreadyExists extends ConflictException {
  constructor() {
    super('User already exists');
  }
}
