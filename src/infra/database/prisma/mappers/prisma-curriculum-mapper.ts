import { Course } from '@application/entities/curriculum/course';
import { Curriculum } from '@application/entities/curriculum/curriculum';
import { University } from '@application/entities/curriculum/university';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import {
  Course as CoursePrisma,
  Discipline as DisciplinePrisma,
  Curriculum as RawCurriculumPrisma,
  University as UniversityPrisma,
} from '@prisma/client';
//....

export class PrismaCurriculumMapper {
  static toPrisma(curriculum: Curriculum): RawCurriculumPrisma {
    const {
      course,
      description,
      id,
      extraCurricularHours,
      optionalHours,
      requiredHours,
      university,
    } = curriculum;
    return {
      id: id.toString(),
      courseId: course.id.toString(),
      description,
      extraCurricularHours,
      optionalHours,
      requiredHours,
      universityId: university.id.toString(),
    };
  }

  static toDomain(raw: RawCurriculum): Curriculum {
    const {
      course,
      description,
      extraCurricularHours,
      discipline,
      id,
      optionalHours,
      requiredHours,
      university,
    } = raw;

    return Curriculum.create(
      {
        course: Course.create(
          { name: course.name },
          new UniqueEntityID(course.id),
        ),
        description,
        disciplines: discipline,
        extraCurricularHours,
        optionalHours,
        requiredHours,
        university: University.create(
          { name: university.name, abv: university.abv },
          new UniqueEntityID(university.id),
        ),
      },
      new UniqueEntityID(id),
    );
  }
}

type RawCurriculum = RawCurriculumPrisma & {
  course: CoursePrisma;
  university: UniversityPrisma;
  discipline: DisciplinePrisma[];
};
