import { State } from '@application/entities/state/state';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { State as RawStatePrisma } from '@prisma/client';

export class PrismaStateMapper {
  static toPrisma(state: State): RawStatePrisma {
    return {
      id: state.id.toString(),
      name: state.name,
    };
  }

  static toDomain(raw: RawStatePrisma): State {
    return State.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
