import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';

interface CreateUniversityRequest {
  name: string;
  abv: string;
  city: string;
  state: string;
}

interface CreateUniversityResponse {
  university: University;
}

@Injectable()
export class CreateUniversity {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(
    request: CreateUniversityRequest,
  ): Promise<CreateUniversityResponse> {
    const { name, abv , city, state} = request;

    const university = University.create({
      name,
      abv,
      city,
      state
    });

    await this.universitiesRepository.create(university);

    return {
      university,
    };
  }
}
