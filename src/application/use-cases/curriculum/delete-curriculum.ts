import { Injectable } from '@nestjs/common';

import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { CurriculumNotFound } from '../errors/curriculum-not-found';

interface DeleteCurriculumResponse {
  curriculum: Curriculum;
}
interface DeleteCurriculumRequest {
  curriculumId: string;
}

@Injectable()
export class DeleteCurriculum {
  constructor(private curriculumsRepository: CurriculumsRepository) {}

  async execute(
    request: DeleteCurriculumRequest,
  ): Promise<DeleteCurriculumResponse> {
    const curriculum = await this.curriculumsRepository.findById(
      request.curriculumId,
    );

    if (!curriculum) {
      throw new CurriculumNotFound();
    }

    await this.curriculumsRepository.delete(curriculum.id.toString());

    return {
      curriculum,
    };
  }
}
