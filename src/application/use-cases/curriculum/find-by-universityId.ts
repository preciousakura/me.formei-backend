import { Injectable } from '@nestjs/common';

import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';

interface FindCurriculumRequest {
  universityId: string;
}
interface FindCurriculumResponse {
  curriculums: Curriculum[] | null;
}

@Injectable()
export class FindCurriculumsByUniversityId {
  constructor(private curriculumsRepository: CurriculumsRepository) {}

  async execute(
    request: FindCurriculumRequest,
  ): Promise<FindCurriculumResponse> {
    const { universityId } = request;
    const curriculums = await this.curriculumsRepository.findByUniversityId(
      universityId,
    );

    return {
      curriculums,
    };
  }
}
