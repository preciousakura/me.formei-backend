import { CreateStudent } from '@application/use-cases/student/create-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStudentBody } from '../dto/student/create-student.dto';
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

  @Post()
  async postStudent(@Body() createStudentBody: CreateStudentBody) {
    const { student } = await this.createStudent.execute(createStudentBody);

    return {
      message: 'Estudante criado!',

      student: StudentViewModel.toHTTP(student),
    };
  }
}
