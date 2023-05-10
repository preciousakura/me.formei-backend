import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { User as RawUser } from '@prisma/client';
import { User, UserProps } from 'src/application/entities/user/user';
export class PrismaUserMapper {
  static toPrisma(user: User<UserProps>) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(raw: RawUser): User<UserProps> {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
