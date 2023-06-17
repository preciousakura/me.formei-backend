import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { CurriculumsRepository } from '@application/repositories/curriculums-repository';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';
import { ExtraCurricularRepository } from '@application/repositories/extracurricular-repository';
import { UniversitiesRepository } from '@application/repositories/universities-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { Module } from '@nestjs/common';
import { AdminsRepository } from 'src/application/repositories/admins-repository';
import { StudentsRepository } from 'src/application/repositories/students-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminsRepository } from './prisma/repositories/prisma-admins-repository';
import { PrismaCourseHistoryRepository } from './prisma/repositories/prisma-course-history-reporsitory';
import { PrismaCoursesRepository } from './prisma/repositories/prisma-course-repository';
import { PrismaCurriculumsRepository } from './prisma/repositories/prisma-curriculums-repository';
import { PrismaDisciplinesRepository } from './prisma/repositories/prisma-disciplines-repository';
import { PrismaExtraCurricularRepository } from './prisma/repositories/prisma-extracurricular-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { PrismaUniversitiesRepository } from './prisma/repositories/prisma-university-repository';
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

    {
      provide: UniversitiesRepository,
      useClass: PrismaUniversitiesRepository,
    },
    {
      provide: CurriculumsRepository,
      useClass: PrismaCurriculumsRepository,
    },
    {
      provide: CoursesRepository,
      useClass: PrismaCoursesRepository,
    },
    {
      provide: DisciplinesRepository,
      useClass: PrismaDisciplinesRepository,
    },
    {
      provide: CourseHistoriesRepository,
      useClass: PrismaCourseHistoryRepository,
    },
    {
      provide: ExtraCurricularRepository,
      useClass: PrismaExtraCurricularRepository,
    },
  ],
  exports: [
    StudentsRepository,
    AdminsRepository,
    UsersRepository,
    UniversitiesRepository,
    CurriculumsRepository,
    CoursesRepository,
    DisciplinesRepository,
    CourseHistoriesRepository,
    ExtraCurricularRepository,
  ],
})
export class DatabaseModule {}
