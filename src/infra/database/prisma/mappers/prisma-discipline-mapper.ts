import { Discipline } from '@application/entities/discipline/discipline';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Discipline as RawDisciplinePrisma } from '@prisma/client';

export class PrismaDisciplineMapper {
  static toPrisma(discipline: Discipline) {
    return {
      id: discipline.id.toString(),
      cod: discipline.cod,
      optional: discipline.optional,
      name: discipline.name,
      courseOutline: discipline.courseOutline,
      semester: discipline.semester,
      description: discipline.description,
      curriculumId: discipline.curriculumId,
      prerequisitesDisciplines: discipline.prerequisiteDisciplines,
      bibliography: discipline.bibliography,
      hours: discipline.hours,
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
        prerequisiteDisciplines: raw?.prerequisitesDisciplines?.map(
          (discipline) => discipline.cod,
        ),
        hours: raw.hours,
        bibliography: raw.bibliography,
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawDiscipline = RawDisciplinePrisma & {
  prerequisitesDisciplines: RawDisciplinePrisma[];
};
