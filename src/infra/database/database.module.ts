import { UsersRepository } from '@application/repositories/users-repository';
import { Module } from '@nestjs/common';
import { AdminsRepository } from 'src/application/repositories/admins-repository';
import { StudentsRepository } from 'src/application/repositories/students-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminsRepository } from './prisma/repositories/prisma-admins-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { CitiesRepository } from '@application/repositories/cities-repository';
import { PrismaCitiesRepository } from './prisma/repositories/prisma-cities-repository';
import { StatesRepository } from '@application/repositories/states-repository';
import { PrismaStatesRepository } from './prisma/repositories/prisma-states-repository';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { PrismaUniversitiesRepository } from './prisma/repositories/prisma-university-repository';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { PrismaCurriculumsRepository } from './prisma/repositories/prisma-curriculums-repository';

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
    {
      provide: CitiesRepository,
      useClass: PrismaCitiesRepository,
    },
    {
      provide: StatesRepository,
      useClass: PrismaStatesRepository,
    },
    {
      provide: UniversitiesRepository,
      useClass: PrismaUniversitiesRepository,
    },
    {
      provide: CurriculumsRepository,
      useClass: PrismaCurriculumsRepository,
    },
  ],
  exports: [StudentsRepository, AdminsRepository, UsersRepository, CitiesRepository, StatesRepository, UniversitiesRepository, CurriculumsRepository],
})
export class DatabaseModule {}
