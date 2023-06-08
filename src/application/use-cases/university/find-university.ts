import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { UniversityNotFound } from '../errors/university-not-found';

interface FindUniversityRequest {
  universityId: string;
}
interface FindUniversityResponse {
  university: University;
}

@Injectable()
export class FindUniversity {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(
    request: FindUniversityRequest,
  ): Promise<FindUniversityResponse> {
    const { universityId } = request;
    const university = await this.universitiesRepository.findById(universityId);

    if (!university) throw new UniversityNotFound();

    return {
      university,
    };
  }
}
