import { Injectable } from '@nestjs/common';

import { Curriculum } from '@application/entities/curriculum/curriculum';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { CreateCurriculumBody } from '@infra/http/dto/curriculum/create-curriculum.dto';
import { CourseNotFound } from '../errors/course-not-found';
import { UniversityNotFound } from '../errors/university-not-found';

type CreateCourseRequest = CreateCurriculumBody & {
  universityId: string;
};

interface CreateCurriculumResponse {
  curriculum: Curriculum;
}

@Injectable()
export class CreateCurriculum {
  constructor(
    private curriculumsRepository: CurriculumsRepository,
    private coursesRepository: CoursesRepository,
    private universityRepository: UniversitiesRepository,
  ) {}

  async execute(
    request: CreateCourseRequest,
  ): Promise<CreateCurriculumResponse> {
    const {
      description,
      courseId,
      extraCurricularHours,
      optionalHours,
      requiredHours,
      universityId,
    } = request;
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new CourseNotFound();
    }

    const university = await this.universityRepository.findById(universityId);

    if (!university) {
      throw new UniversityNotFound();
    }

    const curriculum = Curriculum.create({
      course,
      description,
      extraCurricularHours,
      optionalHours,
      requiredHours,
      university,
    });

    await this.curriculumsRepository.create(curriculum);

    return {
      curriculum,
    };
  }
}
