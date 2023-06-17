import { Injectable } from '@nestjs/common';

import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { UniversityNotFound } from '../errors/university-not-found';

interface FindCurriculumRequest {
  universityId: string;
  curriculumId: string;
}
interface FindCurriculumResponse {
  curriculum: Curriculum | null;
}

@Injectable()
export class FindCurriculumsByUniversityIdAndCurriculumId {
  constructor(
    private curriculumsRepository: CurriculumsRepository,
    private universitiesRepository: UniversitiesRepository,
  ) {}

  async execute(
    request: FindCurriculumRequest,
  ): Promise<FindCurriculumResponse> {
    const { universityId, curriculumId } = request;

    const university = await this.universitiesRepository.findById(universityId);

    if (!university) {
      throw new UniversityNotFound();
    }

    const curriculum =
      await this.curriculumsRepository.findByUniversityIdAndCurriculumId({
        curriculumId,
        universityId,
      });

    return {
      curriculum,
    };
  }
}
