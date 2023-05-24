import { City } from '@application/entities/city/city';
import { State } from '@application/entities/state/state';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { City as RawCityPrisma, State as StatePrisma } from '@prisma/client';
export class PrismaCityMapper {
  static toPrisma(city: City): RawCityPrisma {
    return {
      id: city.id.toString(),
      name: city.name,
      stateId: city.state.id.toString(),
    };
  }

  static toDomain(raw: RawCity): City {
    return City.create(
      {
        name: raw.name,
        state: State.create(
          { name: raw.state.name },
          new UniqueEntityID(raw.state.id),
        ),
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawCity = RawCityPrisma & {
  state: StatePrisma;
};
