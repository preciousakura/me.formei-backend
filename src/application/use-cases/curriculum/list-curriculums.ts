import { Injectable } from '@nestjs/common';

import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';

interface ListCurriculumsResponse {
  curriculums: Curriculum[];
}

@Injectable()
export class ListCurriculums {
  constructor(private curriculumsRepository: CurriculumsRepository) {}

  async execute(): Promise<ListCurriculumsResponse> {
    const curriculums = await this.curriculumsRepository.list();

    return {
      curriculums,
    };
  }
}
