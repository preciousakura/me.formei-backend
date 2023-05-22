import { City } from '@application/entities/city/city';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import {
  City as CityPrisma,
  Admin as RawAdminPrisma,
  State,
  User,
} from '@prisma/client';
import { Admin } from 'src/application/entities/admin/admin';

export class PrismaAdminMapper {
  static toPrisma(admin: Admin) {
    return {
      userId: admin.id.toString(),
      id: admin.adminId.toString(),
    };
  }

  static toDomain(raw: RawAdmin): Admin {
    return Admin.create(
      {
        email: raw.user.email,
        name: raw.user.name,
        password: raw.user.password,
        adminId: new UniqueEntityID(raw.id),
        city: City.create(
          { name: raw.user.city.name, stateId: raw.user.city.stateId },
          new UniqueEntityID(raw.user.city.id),
        ),
        state: raw.user.city.state.name,
        lastname: raw.user.lastname,
        username: raw.user.username,
      },
      new UniqueEntityID(raw.user.id),
    );
  }
}

type RawAdmin = RawAdminPrisma & {
  user: User & {
    city: CityPrisma & {
      state: State;
    };
  };
};
