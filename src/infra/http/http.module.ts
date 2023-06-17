import { EncriptionPassword } from '@application/use-cases/authentication/encription-password';
import { Login } from '@application/use-cases/authentication/login';
import { RegisterAccountAdmin } from '@application/use-cases/authentication/register-admin';
import { RegisterAccountStudent } from '@application/use-cases/authentication/register-student';
import { ValidToken } from '@application/use-cases/authentication/valid-token';
import { AssociateDisciplineInStudentSemester } from '@application/use-cases/course-history/associate-discipline-in-student-semester';
import { DisassociateDisciplineInStudentSemester } from '@application/use-cases/course-history/disassociate-discipline-in-student-semester';
import { FindCourseHistoryByStatusAndStudentRegistration } from '@application/use-cases/course-history/find-course-history-by-status';
import { FindCourseHistoryByStudentRegistrationBySemesterByDisciplineId } from '@application/use-cases/course-history/find-course-history-by-student-registration-semester-discipline-id';
import { FindDisciplinesHistoryByStudentRegistration } from '@application/use-cases/course-history/find-disciplines-history-by-student-registration';
import { FindDisciplinesHistoryByStudentRegistrationBySemester } from '@application/use-cases/course-history/find-disciplines-history-by-student-registration-semester';
import { ListDisciplinesHistoryTodo } from '@application/use-cases/course-history/list-disciplines-history-to-do';
import { CreateCourse } from '@application/use-cases/course/create-course';
import { FindCourse } from '@application/use-cases/course/find-course';
import { ListCourses } from '@application/use-cases/course/list-courses';
import { UpdateCourse } from '@application/use-cases/course/update-course';
import { CreateCurriculum } from '@application/use-cases/curriculum/create-curriculum';
import { FindCurriculumsByUniversityId } from '@application/use-cases/curriculum/find-by-universityId';
import { FindCurriculumsByUniversityIdAndCurriculumId } from '@application/use-cases/curriculum/find-by-universityId-and-curriculumId';
import { CreateDiscipline } from '@application/use-cases/discipline/create-discipline';
import { FindDiscipline } from '@application/use-cases/discipline/find-discipline';
import { FindDisciplinesByCurriculum } from '@application/use-cases/discipline/find-disciplines-by-curriculum';
import { CreateExtraCurricularActivity } from '@application/use-cases/extracurricular-activities/create-extracurricular-activity';
import { DeleteExtraCurricular } from '@application/use-cases/extracurricular-activities/delete-extracurricular-activity';
import { FindExtraCurricularActivityByStudent } from '@application/use-cases/extracurricular-activities/find-extracurricular-activity-by-student';
import { DeleteStudent } from '@application/use-cases/student/delete-student';
import { FindStudent } from '@application/use-cases/student/find-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { UpdateStudent } from '@application/use-cases/student/update-student';
import { CreateUniversity } from '@application/use-cases/university/create-university';
import { FindUniversitiesByCity } from '@application/use-cases/university/find-universities-by-city';
import { FindUniversitiesByState } from '@application/use-cases/university/find-universities-by-state';
import { FindUniversity } from '@application/use-cases/university/find-university';
import { ListUniversities } from '@application/use-cases/university/list-universities';
import { jwtConstants } from '@config/constants';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateStudent } from 'src/application/use-cases/student/create-student';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './controllers/auth.controller';
import { CoursesController } from './controllers/course.controller';
import { StudentsController } from './controllers/students.controller';
import { UniversitiesController } from './controllers/university.controller';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [
    StudentsController,
    AuthController,
    UniversitiesController,
    CoursesController,
  ], //controllers http
  providers: [
    CreateStudent,
    ListStudents,
    FindStudent,
    DeleteStudent,
    UpdateStudent,
    Login,
    RegisterAccountAdmin,
    RegisterAccountStudent,
    EncriptionPassword,
    CreateCourse,
    ListCourses,
    FindCourse,
    UpdateCourse,
    CreateUniversity,
    ListUniversities,
    FindUniversity,
    FindCurriculumsByUniversityId,
    FindUniversitiesByState,
    FindUniversitiesByCity,
    CreateCurriculum,
    ValidToken,
    FindCurriculumsByUniversityIdAndCurriculumId,
    CreateDiscipline,
    FindDiscipline,
    FindDisciplinesByCurriculum,
    AssociateDisciplineInStudentSemester,
    DisassociateDisciplineInStudentSemester,
    FindCourseHistoryByStudentRegistrationBySemesterByDisciplineId,
    FindDisciplinesHistoryByStudentRegistrationBySemester,
    FindDisciplinesHistoryByStudentRegistration,
    FindCourseHistoryByStatusAndStudentRegistration,
    CreateExtraCurricularActivity,
    DeleteExtraCurricular,
    FindExtraCurricularActivityByStudent,
    ListDisciplinesHistoryTodo,
  ], // casos de uso
})
export class HttpModule {}
