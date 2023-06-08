import { Injectable } from '@nestjs/common';

import {
  ExtraCurricular,
  ExtraCurricularProps,
} from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';

interface CreateExtraCurricularActivityResponse {
  extraCurricularActivity: ExtraCurricular;
}

@Injectable()
export class CreateExtraCurricularActivity {
  constructor(private extraCurricularRepository: ExtraCurricularRepository) {}

  async execute(
    request: ExtraCurricularProps,
  ): Promise<CreateExtraCurricularActivityResponse> {
    const extraCurricular = ExtraCurricular.create(request);

    await this.extraCurricularRepository.create(extraCurricular);

    return {
      extraCurricularActivity: extraCurricular,
    };
  }
}
