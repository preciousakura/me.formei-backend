import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';


interface ListUniversitiesResponse {
  universities: University[];
}

@Injectable()
export class ListUniversities {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(): Promise<ListUniversitiesResponse> {
    const universities = await this.universitiesRepository.list();

    return {
      universities,
    };
  }
}
