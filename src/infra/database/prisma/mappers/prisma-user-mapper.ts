import { User, UserProps } from '@application/entities/user/user';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { User as RawUserPrisma } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User<UserProps>) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      lastname: user.lastname,
      username: user.username,
      city: user.city,
      state: user.state,
    };
  }

  static toDomain(raw: RawUser): User<UserProps> {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        city: raw.city,
        state: raw.state,
        lastname: raw.lastname,
        username: raw.username,
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawUser = RawUserPrisma;
