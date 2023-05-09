import { ListStudents } from '@application/use-cases/student/list-students';
import { Module } from '@nestjs/common';
import { CreateStudent } from 'src/application/use-cases/student/create-student';
import { DatabaseModule } from 'src/infra/database/database.module';
import { StudentsController } from './controllers/students.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentsController], //controllers http
  providers: [CreateStudent, ListStudents], // casos de uso
})
export class HttpModule {}
