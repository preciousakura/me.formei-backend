import { Injectable } from '@nestjs/common';

import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { CurriculumNotFound } from '../errors/curriculum-not-found';

interface FindCurriculumRequest {
  curriculumId: string;
}
interface FindCurriculumResponse {
  curriculum: Curriculum;
}

@Injectable()
export class FindCurriculum {
  constructor(private curriculumsRepository: CurriculumsRepository) {}

  async execute(
    request: FindCurriculumRequest,
  ): Promise<FindCurriculumResponse> {
    const { curriculumId } = request;
    const curriculum = await this.curriculumsRepository.findById(curriculumId);

    if (!curriculum) throw new CurriculumNotFound();

    return {
      curriculum,
    };
  }
}
