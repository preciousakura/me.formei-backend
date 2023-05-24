import { DeleteStudent } from '@application/use-cases/student/delete-student';
import { FindStudent } from '@application/use-cases/student/find-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { UpdateStudent } from '@application/use-cases/student/update-student';
import { Module } from '@nestjs/common';
import { CreateStudent } from 'src/application/use-cases/student/create-student';
import { DatabaseModule } from 'src/infra/database/database.module';
import { StudentsController } from './controllers/students.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentsController], //controllers http
  providers: [
    CreateStudent,
    ListStudents,
    FindStudent,
    DeleteStudent,
    UpdateStudent,
  ], // casos de uso
})
export class HttpModule {}
