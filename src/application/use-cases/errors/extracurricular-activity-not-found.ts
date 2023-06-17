import { NotFoundException } from '@nestjs/common';

export class ExtraCurricularActivityNotFound extends NotFoundException {
  constructor() {
    super('ExtraCurricularActivity not found.');
  }
}
