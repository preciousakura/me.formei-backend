import { Course } from '@application/entities/curriculum/course';
import { University } from '@application/entities/curriculum/university';
import { Discipline } from '@application/entities/discipline/discipline';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import {
  Course as CoursePrisma,
  Curriculum as CurriculumPrisma,
  Discipline as RawDisciplinePrisma,
  University as UniversityPrisma,
} from '@prisma/client';

export class PrismaDisciplineMapper {
  static toPrisma(discipline: Discipline): RawDisciplinePrisma {
    return {
      id: discipline.id.toString(),
      cod: discipline.cod,
      optional: discipline.optional,
      name: discipline.name,
      courseOutline: discipline.courseOutline,
      semester: discipline.semester,
      description: discipline.description,
      curriculumId: discipline.curriculumId,
    };
  }

  static toDomain(raw: RawDiscipline): Discipline {
    return Discipline.create(
      {
        cod: raw.cod,
        optional: raw.optional,
        name: raw.name,
        courseOutline: raw.courseOutline,
        semester: raw.semester,
        description: raw.description,
        curriculumId: raw.curriculumId,
        course: Course.create(
          {
            name: raw.curriculum.course.name,
          },
          new UniqueEntityID(raw.curriculum.course.id),
        ),
        university: University.create(
          {
            name: raw.curriculum.university.name,
            abv: raw.curriculum.university.abv,
            city: raw.curriculum.university.city,
            state: raw.curriculum.university.state,
          },
          new UniqueEntityID(raw.curriculum.university.id),
        ),
        prerequisiteDisciplines: [],
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawDiscipline = RawDisciplinePrisma & {
  curriculum: CurriculumPrisma & {
    university: UniversityPrisma;
    course: CoursePrisma;
  };
};
