import { City } from '@application/entities/city/city';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { City as RawCityPrisma } from '@prisma/client';
export class PrismaCityMapper {
  static toPrisma(city: City): RawCityPrisma {
    return {
      id: city.id.toString(),
      name: city.name,
      stateId: city.stateId,
    };
  }

  static toDomain(raw: RawCityPrisma): City {
    return City.create(
      {
        name: raw.name,
        stateId: raw.stateId,
      },
      new UniqueEntityID(raw.id),
    );
  }
}

// type RawCity = RawCityPrisma & {
//   state: State;
// };
