import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Admin as RawAdminPrisma, User } from '@prisma/client';
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
        city: raw.user.city,
        state: raw.user.state,
        lastname: raw.user.lastname,
        username: raw.user.username,
      },
      new UniqueEntityID(raw.user.id),
    );
  }
}

type RawAdmin = RawAdminPrisma & {
  user: User;
};
