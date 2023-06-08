import { Injectable } from '@nestjs/common';

import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';
import { ExtraCurricularActivityNotFound } from '../errors/extracurricular-activity-not-found';

interface Request {
  extraCurricularActivity: ExtraCurricular;
}
interface Response {
  extraCurricularActivity: ExtraCurricular;
}

@Injectable()
export class UpdateExtraCurricularActivity {
  constructor(private extraCurricularRepository: ExtraCurricularRepository) {}

  async execute(request: Request): Promise<Response> {
    const { extraCurricularActivity } = request;

    const extraCurricularActivityFinded =
      await this.extraCurricularRepository.findById(
        extraCurricularActivity.id.toString(),
      );

    if (!extraCurricularActivityFinded)
      throw new ExtraCurricularActivityNotFound();

    const extraCurricularActivityUpdated =
      await this.extraCurricularRepository.update(extraCurricularActivity);

    return {
      extraCurricularActivity: extraCurricularActivityUpdated,
    };
  }
}
