import { Injectable } from '@nestjs/common';

import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';
import { ExtraCurricularActivityNotFound } from '../errors/extracurricular-activity-not-found';

interface Request {
  id: string;
}
interface Response {
  extraCurricularActivity: ExtraCurricular;
}

@Injectable()
export class FindExtraCurricularActivity {
  constructor(private extraCurricularRepository: ExtraCurricularRepository) {}

  async execute(request: Request): Promise<Response> {
    const { id } = request;
    const extraCurricular = await this.extraCurricularRepository.findById(id);

    if (!extraCurricular) throw new ExtraCurricularActivityNotFound();

    return {
      extraCurricularActivity: extraCurricular,
    };
  }
}
