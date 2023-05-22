import { City } from '@application/entities/city/city';
import { User, UserProps } from '@application/entities/user/user';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import {
  City as CityPrisma,
  User as RawUserPrisma,
  State,
} from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User<UserProps>) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      lastname: user.lastname,
      username: user.username,
      cityId: user.city.id.toString(),
    };
  }

  static toDomain(raw: RawUser): User<UserProps> {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        city: City.create(
          { name: raw.city.name, stateId: raw.city.stateId },
          new UniqueEntityID(raw.city.id),
        ),
        state: raw.city.state.name,
        lastname: raw.lastname,
        username: raw.username,
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawUser = RawUserPrisma & {
  city: CityPrisma & {
    state: State;
  };
};
