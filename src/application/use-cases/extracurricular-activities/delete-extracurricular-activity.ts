import { Injectable } from '@nestjs/common';

import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';
import { ExtraCurricularActivityNotFound } from '../errors/extracurricular-activity-not-found';

interface Response {
  extraCurricular: ExtraCurricular;
}
interface Request {
  id: string;
}

@Injectable()
export class DeleteExtraCurricular {
  constructor(private extraCurricularRepository: ExtraCurricularRepository) {}

  async execute(request: Request): Promise<Response> {
    const exc = await this.extraCurricularRepository.findById(request.id);

    if (!exc) {
      throw new ExtraCurricularActivityNotFound();
    }

    await this.extraCurricularRepository.delete(exc.id.toString());

    return {
      extraCurricular: exc,
    };
  }
}
