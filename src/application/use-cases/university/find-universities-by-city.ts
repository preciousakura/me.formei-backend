import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';

interface FindUniversityByStateRequest {
  city: string;
}
interface FindUniversityByStateResponse {
  universities: University[];
}

@Injectable()
export class FindUniversitiesByCity {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(
    request: FindUniversityByStateRequest,
  ): Promise<FindUniversityByStateResponse> {
    const { city } = request;
    const universities = await this.universitiesRepository.findByCity(city);

    return {
      universities,
    };
  }
}
