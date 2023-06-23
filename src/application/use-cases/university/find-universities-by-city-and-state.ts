import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { UniversityNotFound } from '../errors/university-not-found';

interface FindUniversityByStateRequest {
  city: string;
  state: string;
}
interface FindUniversityByStateResponse {
  universities: University[];
}

@Injectable()
export class FindUniversitiesByCityAndState {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(
    request: FindUniversityByStateRequest,
  ): Promise<FindUniversityByStateResponse> {
    const { city, state } = request;

    const universitiesByState = await this.universitiesRepository.findByState(
      state,
    );
    const universitiesByCity = await this.universitiesRepository.findByCity(
      city,
    );

    if (universitiesByState.length === 0) {
      throw new UniversityNotFound();
    }

    if (universitiesByCity.length === 0) {
      throw new UniversityNotFound();
    }

    const universities = universitiesByState.filter((university) =>
      universitiesByCity.includes(university),
    );

    return {
      universities,
    };
  }
}
