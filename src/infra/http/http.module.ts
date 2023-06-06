import { EncriptionPassword } from '@application/use-cases/authentication/encription-password';
import { Login } from '@application/use-cases/authentication/login';
import { RegisterAccountAdmin } from '@application/use-cases/authentication/register-admin';
import { RegisterAccountStudent } from '@application/use-cases/authentication/register-student';
import { DeleteStudent } from '@application/use-cases/student/delete-student';
import { FindStudent } from '@application/use-cases/student/find-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { UpdateStudent } from '@application/use-cases/student/update-student';
import { jwtConstants } from '@config/constants';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateStudent } from 'src/application/use-cases/student/create-student';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './controllers/auth.controller';
import { StudentsController } from './controllers/students.controller';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [StudentsController, AuthController], //controllers http
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
  ], // casos de uso
})
export class HttpModule {}
