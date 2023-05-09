import { CreateStudent } from '@application/use-cases/student/create-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { Controller, Get } from '@nestjs/common';
import { StudentViewModel } from '../view-models/student-view-model';

@Controller('students')
export class StudentsController {
  constructor(
    private createStudent: CreateStudent,
    private listStudents: ListStudents,
  ) {}

  @Get()
  async listAllStudents() {
    const { students } = await this.listStudents.execute();

    return {
      students: students.map(StudentViewModel.toHTTP),
    };
  }
}
