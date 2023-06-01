import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';

interface CreateUniversityRequest {
  name: string;
  abv: string;
}

interface CreateUniversityResponse {
  university: University;
}

@Injectable()
export class CreateUniversity {
  constructor(
    private universitiesRepository: UniversitiesRepository,
  ) {}

  async execute(request: CreateUniversityRequest): Promise<CreateUniversityResponse> {
    const {
      name,
      abv,
    } = request;

    const university = University.create(
      {
        name,
        abv
      },
    );

    await this.universitiesRepository.create(university);

    return {
      university,
    };
  }
}
