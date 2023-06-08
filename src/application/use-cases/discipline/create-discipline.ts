import { Discipline } from '@application/entities/discipline/discipline'; // teste
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';

import { Injectable } from '@nestjs/common';
import { Curriculum } from '@prisma/client';
import { CurriculumNotFound } from '../errors/curriculum-not-found';

interface CreateDisciplineRequest {
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  curriculum: Curriculum;
  curriculumId: string;
}

interface CreateDisciplineResponse {
  discipline: Discipline;
}

@Injectable()
export class CreateDiscipline {
  curriculumsRepository: any;
  constructor(private disciplinesRepository: DisciplinesRepository) {}

  async execute(
    request: CreateDisciplineRequest,
  ): Promise<CreateDisciplineResponse> {
    const {
      cod,
      optional,
      name,
      courseOutline,
      semester,
      description,
      curriculumId,
    } = request;

    const curriculum = await this.curriculumsRepository.findById(curriculumId);

    if (!curriculum) {
      throw new CurriculumNotFound();
    }

    const discipline = Discipline.create({
      cod,
      optional,
      name,
      courseOutline,
      semester,
      description,
      curriculumId,
      course: curriculum.course,
      university: curriculum.university,
      prerequisiteDisciplines: [],
    });

    await this.disciplinesRepository.create(discipline);

    return {
      discipline,
    };
  }
}
