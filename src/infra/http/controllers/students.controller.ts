import { CreateStudent } from '@application/use-cases/student/create-student';
import { DeleteStudent } from '@application/use-cases/student/delete-student';
import { FindStudent } from '@application/use-cases/student/find-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { UpdateStudent } from '@application/use-cases/student/update-student';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { makeStudent } from '@test/factories/student-factory';
import { StudentHttp } from '../types-class-http/student-http';
import { StudentViewModel } from '../view-models/student-view-model';

export class ResponseStudent {
  @ApiProperty()
  message: string;
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
  @ApiResponse({ type: StudentHttp, isArray: true })
  async listAllStudents() {
    // const { students } = await this.listStudents.execute();
    const students = [
      makeStudent({ name: 'Estudante1', registration: '439990' }),
      makeStudent({ name: 'Estudante2', registration: '429490' }),
    ];

    return {
      students: students.map(StudentViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiResponse({ type: ResponseStudent })
  async getStudent(@Param('id') id: string) {
    // const { student } = await this.findStudent.execute({ studentId: id });
    const student = makeStudent({
      name: 'EstudanteExemplo',
      registration: '411112',
    });
    return {
      message: 'Estudante encontrado!',
      student: StudentViewModel.toHTTP(student),
    };
  }

  // @Post()
  // @ApiResponse({ type: ResponseStudent })
  // async postStudent(@Body() createStudentBody: CreateStudentBody) {
  //   const { student } = await this.createStudent.execute(createStudentBody);

  //   return {
  //     message: 'Estudante criado!',

  //     student: StudentViewModel.toHTTP(student),
  //   };
  // }

  // @Patch(':id')
  // @ApiResponse({ type: ResponseStudent })
  // async patchStudent(@Body() updateStudentBody: UpdateStudentBody) {
  //   const { student } = await this.updateStudent.execute(updateStudentBody);

  //   return {
  //     message: 'Estudante atualizado!',

  //     student: StudentViewModel.toHTTP(student),
  //   };
  // }
}
