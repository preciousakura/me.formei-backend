import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { UniversityNotFound } from '../errors/university-not-found';

interface UpdateUniversityRequest {
  university: University;
}
interface UpdateUniversityResponse {
  university: University;
}

@Injectable()
export class UpdateUniversity {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(request: UpdateUniversityRequest): Promise<UpdateUniversityResponse> {
    const { university } = request;

    const universityFinded = await this.universitiesRepository.findById(
      university.universityId.toString(),
    );

    if (!universityFinded) throw new UniversityNotFound();

    const universityUpdated = await this.universitiesRepository.update(university);

    return {
      university: universityUpdated,
    };
  }
}
