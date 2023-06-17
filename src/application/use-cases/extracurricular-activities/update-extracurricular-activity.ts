import { Injectable } from '@nestjs/common';

import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';
import { UpdateExtraCurricularActivityBody } from '@infra/http/dto/extra-curricular-activity/update-extra-curricular-activity.dto';
import { ExtraCurricularActivityNotFound } from '../errors/extracurricular-activity-not-found';

interface Request {
  id: string;
  extraCurricularActivity: ExtraCurricular;
}
interface Response {
  extraCurricularActivity: UpdateExtraCurricularActivityBody; // a fazer
}

@Injectable()
export class UpdateExtraCurricularActivity {
  constructor(private extraCurricularRepository: ExtraCurricularRepository) {}

  async execute(request: Request): Promise<Response> {
    const { extraCurricularActivity, id } = request;

    const extraCurricularActivityFinded =
      await this.extraCurricularRepository.findById(id);

    if (!extraCurricularActivityFinded)
      throw new ExtraCurricularActivityNotFound();

    const data = ExtraCurricular.create(
      { ...extraCurricularActivityFinded._props, ...extraCurricularActivity },
      extraCurricularActivityFinded.id,
    );

    const extraCurricularActivityUpdated =
      await this.extraCurricularRepository.update(data);

    return {
      extraCurricularActivity: extraCurricularActivityUpdated,
    };
  }
}
