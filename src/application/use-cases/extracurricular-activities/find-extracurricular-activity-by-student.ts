import { Injectable } from '@nestjs/common';

import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';

interface Request {
  studentRegistration: string;
}
interface Response {
  extraCurricularActivities: ExtraCurricular[];
}

@Injectable()
export class FindExtraCurricularActivityByStudent {
  constructor(private extraCurricularRepository: ExtraCurricularRepository) {}

  async execute(request: Request): Promise<Response> {
    const { studentRegistration } = request;
    const extraCurricularActivities =
      await this.extraCurricularRepository.findByStudentRegistration(
        studentRegistration,
      );

    return {
      extraCurricularActivities,
    };
  }
}
