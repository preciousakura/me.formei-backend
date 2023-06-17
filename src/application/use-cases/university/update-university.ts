import { Injectable } from '@nestjs/common';

import { University } from '@application/entities/curriculum/university';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { UpdateUniversityBody } from '@infra/http/dto/university/update-university.dto';
import { UniversityNotFound } from '../errors/university-not-found';

interface UpdateUniversityRequest {
  id: string;
  university: UpdateUniversityBody;
}
interface UpdateUniversityResponse {
  university: University;
}

@Injectable()
export class UpdateUniversity {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(
    request: UpdateUniversityRequest,
  ): Promise<UpdateUniversityResponse> {
    const { university, id } = request;

    const universityFinded = await this.universitiesRepository.findById(id);

    if (!universityFinded) throw new UniversityNotFound();

    const data = University.create(
      { ...universityFinded._props, ...university },
      universityFinded.id,
    );

    const universityUpdated = await this.universitiesRepository.update(data);

    return {
      university: universityUpdated,
    };
  }
}
