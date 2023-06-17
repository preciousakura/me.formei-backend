import { Injectable } from '@nestjs/common';

import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { CurriculumNotFound } from '../errors/curriculum-not-found';

interface UpdateCurriculumRequest {
  curriculum: Curriculum;
}
interface UpdateCurriculumResponse {
  curriculum: Curriculum;
}

@Injectable()
export class UpdateCurriculum {
  constructor(private curriculumsRepository: CurriculumsRepository) {}

  async execute(
    request: UpdateCurriculumRequest,
  ): Promise<UpdateCurriculumResponse> {
    const { curriculum } = request;

    const curriculumFinded = await this.curriculumsRepository.findById(
      curriculum.id.toString(),
    );

    if (!curriculumFinded) throw new CurriculumNotFound();

    const curriculumUpdated = await this.curriculumsRepository.update(
      curriculum,
    );

    return {
      curriculum: curriculumUpdated,
    };
  }
}
