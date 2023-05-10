import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Admin as RawAdmin, User } from '@prisma/client';
import { Admin } from 'src/application/entities/admin/admin';

export class PrismaAdminMapper {
  static toPrisma(admin: Admin) {
    return {
      userId: admin.id.toString(),
      id: admin.adminId.toString(),
    };
  }

  static toDomain(
    raw: RawAdmin & {
      user: User;
    },
  ): Admin {
    return Admin.create(
      {
        email: raw.user.email,
        name: raw.user.name,
        password: raw.user.password,
        adminId: new UniqueEntityID(raw.id),
      },
      new UniqueEntityID(raw.user.id),
    );
  }
}
