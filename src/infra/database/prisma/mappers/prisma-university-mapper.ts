import { University } from '@application/entities/curriculum/university';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Curriculum, University as RawUniversityPrisma } from '@prisma/client';
export class PrismaUniversityMapper {
  static toPrisma(university: University): RawUniversityPrisma {
    return {
      id: university.id.toString(),
      name: university.name,
      abv: university.abv,
      city: university.city,
      state: university.state,
    };
  }

  static toDomain(raw: RawUniversity): University {
    return University.create(
      {
        name: raw.name,
        abv: raw.abv,
        city: raw.city,
        state: raw.state,
        curriculums: raw.curriculums.map((curriculum) => curriculum.id),
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawUniversity = RawUniversityPrisma & {
  curriculums: Curriculum[];
};
