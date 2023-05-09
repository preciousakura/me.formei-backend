import { Admin as RawAdmin, User } from '@prisma/client';
import { Admin } from 'src/application/entities/admin/admin';

export class PrismaAdminMapper {
  static toPrisma(admin: Admin) {
    return {
      userId: admin.id,
      id: admin.adminId,
    };
  }

  static toDomain(
    raw: RawAdmin & {
      user: User;
    },
  ): Admin {
    return new Admin(
      {
        email: raw.user.email,
        name: raw.user.name,
        password: raw.user.password,
      },
      { adminId: raw.id },
      raw.user.id,
    );
  }
}
