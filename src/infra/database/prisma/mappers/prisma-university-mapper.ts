import { University } from '@application/entities/curriculum/university';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Curriculum, University as RawUniversityPrisma } from '@prisma/client';
export class PrismaUniversityMapper {
  static toPrisma(university: University): RawUniversityPrisma {
    return {
      id: university.id.toString(),
      name: university.name,
      abv: university.abv,
    };
  }

  static toDomain(raw: RawUniversity): University {
    return University.create(
      {
        name: raw.name,
        abv: raw.abv,
        curriculums: raw.curriculums.map((curriculum) => curriculum.id),
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawUniversity = RawUniversityPrisma & {
  curriculums: Curriculum[];
};
