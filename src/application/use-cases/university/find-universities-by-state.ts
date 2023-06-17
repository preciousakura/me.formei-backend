import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';

interface FindUniversityByStateRequest {
  state: string;
}
interface FindUniversityByStateResponse {
  universities: University[];
}

@Injectable()
export class FindUniversitiesByState {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(
    request: FindUniversityByStateRequest,
  ): Promise<FindUniversityByStateResponse> {
    const { state } = request;
    const universities = await this.universitiesRepository.findByState(state);

    return {
      universities,
    };
  }
}
