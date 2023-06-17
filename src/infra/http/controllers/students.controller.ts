import { CreateStudent } from '@application/use-cases/student/create-student';
import { DeleteStudent } from '@application/use-cases/student/delete-student';
import { FindStudent } from '@application/use-cases/student/find-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { UpdateStudent } from '@application/use-cases/student/update-student';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseWithMessage } from '../dto/response-message';
import { CreateStudentBody } from '../dto/student/create-student.dto';
import { UpdateStudentBody } from '../dto/student/update-student.dto';
import { StudentHttp } from '../types-class-http/student-http';
import { StudentViewModel } from '../view-models/student-view-model';

export class StudentResponse {
  @ApiProperty()
  student: StudentHttp;
}

@Controller('students')
@ApiTags('Estudantes')
export class StudentsController {
  constructor(
    private createStudent: CreateStudent,
    private listStudents: ListStudents,
    private findStudent: FindStudent,
    private deleteStudent: DeleteStudent,
    private updateStudent: UpdateStudent,
  ) {}

  @Get()
  @ApiResponse({ type: StudentResponse, isArray: true })
  async listAllStudents() {
    const { students } = await this.listStudents.execute();

    return {
      students: students.map(StudentViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiResponse({ type: StudentResponse && ResponseWithMessage })
  async getStudent(@Param('id') id: string) {
    const { student } = await this.findStudent.execute({ studentId: id });

    return {
      message: 'Estudante encontrado!',
      student: StudentViewModel.toHTTP(student),
    };
  }

  @Post()
  @ApiResponse({ type: StudentResponse && ResponseWithMessage })
  async postStudent(@Body() createStudentBody: CreateStudentBody) {
    const { student } = await this.createStudent.execute(createStudentBody);

    return {
      message: 'Estudante criado!',

      student: StudentViewModel.toHTTP(student),
    };
  }

  @Patch(':id')
  @ApiResponse({ type: StudentResponse && ResponseWithMessage })
  async patchStudent(
    @Body() updateStudentBody: UpdateStudentBody,
    @Param('id') id: string,
  ) {
    const { student } = await this.updateStudent.execute({
      id,
      student: updateStudentBody,
    });

    return {
      message: 'Estudante atualizado!',

      student: StudentViewModel.toHTTP(student),
    };
  }
}
