import { UsersRepository } from '@application/repositories/users-repository';
import { Module } from '@nestjs/common';
import { AdminsRepository } from 'src/application/repositories/admins-repository';
import { StudentsRepository } from 'src/application/repositories/students-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminsRepository } from './prisma/repositories/prisma-admins-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AdminsRepository,
      useClass: PrismaAdminsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [StudentsRepository, AdminsRepository, UsersRepository],
})
export class DatabaseModule {}
