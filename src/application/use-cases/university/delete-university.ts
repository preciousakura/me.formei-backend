import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { UniversityNotFound } from '../errors/university-not-found';

interface DeleteUniversityResponse {
  university: University;
}
interface DeleteUniversityRequest {
  universityId: string;
}

@Injectable()
export class DeleteUniversity {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(
    request: DeleteUniversityRequest,
  ): Promise<DeleteUniversityResponse> {
    const university = await this.universitiesRepository.findById(
      request.universityId,
    );

    if (!university) {
      throw new UniversityNotFound();
    }

    await this.universitiesRepository.delete(university.id.toString());

    return {
      university,
    };
  }
}
