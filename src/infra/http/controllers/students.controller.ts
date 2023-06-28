import {
  CourseHistory,
  StatusType,
} from '@application/entities/course-history/course-history';
import { AssociateDisciplineInStudentSemester } from '@application/use-cases/course-history/associate-discipline-in-student-semester';
import { DisassociateDisciplineInStudentSemester } from '@application/use-cases/course-history/disassociate-discipline-in-student-semester';
import { FindCourseHistoryByStatusAndStudentRegistration } from '@application/use-cases/course-history/find-course-history-by-status';
import { FindCourseHistoryByStudentRegistrationBySemesterByDisciplineId } from '@application/use-cases/course-history/find-course-history-by-student-registration-semester-discipline-id';
import { FindDisciplinesHistoryByStudentRegistration } from '@application/use-cases/course-history/find-disciplines-history-by-student-registration';
import { FindDisciplinesHistoryByStudentRegistrationBySemester } from '@application/use-cases/course-history/find-disciplines-history-by-student-registration-semester';
import { ListDisciplinesHistoryTodo } from '@application/use-cases/course-history/list-disciplines-history-to-do';
import { CreateExtraCurricularActivity } from '@application/use-cases/extracurricular-activities/create-extracurricular-activity';
import { DeleteExtraCurricular } from '@application/use-cases/extracurricular-activities/delete-extracurricular-activity';
import { FindExtraCurricularActivityByStudent } from '@application/use-cases/extracurricular-activities/find-extracurricular-activity-by-student';
import { CreateStudent } from '@application/use-cases/student/create-student';
import { DeleteStudent } from '@application/use-cases/student/delete-student';
import { FindStudent } from '@application/use-cases/student/find-student';
import { ListStudents } from '@application/use-cases/student/list-students';
import { UpdateStudent } from '@application/use-cases/student/update-student';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssociateDisciplineInStudentSemesterBody } from '../dto/course-history/associate-discipline-in-student-semester.dto';
import { FindDisciplinesTodoBody } from '../dto/course-history/findDisciplinesTodo.dto';
import { CreateExtraCurricularActivityBody } from '../dto/extra-curricular-activity/create-extra-curricular-activity.dto';
import { ResponseWithMessage } from '../dto/response-message';
import { CreateStudentBody } from '../dto/student/create-student.dto';
import { UpdateStudentBody } from '../dto/student/update-student.dto';
import { CourseHistoryHttp } from '../types-class-http/course-history-http';
import { ExtraCurricularActivityHttp } from '../types-class-http/extra-curricular-activity-http';
import { StudentHttp } from '../types-class-http/student-http';
import {
  CourseHistoryViewModel,
  ToFront,
} from '../view-models/course-history-view-model';
import { DisciplineViewModel } from '../view-models/discipline-view-model';
import { ExtraCurricularActivityViewModel } from '../view-models/extra-curricular-activity-view-model';
import { StudentViewModel } from '../view-models/student-view-model';

export class StudentResponse {
  @ApiProperty()
  student: StudentHttp;
}

export class StudentResponseWithMessage extends ResponseWithMessage {
  @ApiProperty()
  student: StudentHttp;
}

export class CourseHistoryResponse {
  @ApiProperty()
  disciplineHistory: CourseHistoryHttp;
}

export class CourseHistoryToFrontResponse {
  @ApiProperty({ isArray: true, type: ToFront })
  disciplineHistory: ToFront[];
}

export class ExtraCurricularActivityResponse extends ResponseWithMessage {
  @ApiProperty({ isArray: true, type: ExtraCurricularActivityHttp })
  disciplineHistory: ExtraCurricularActivityHttp[];
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
    private associateDisciplineInStudentSemester: AssociateDisciplineInStudentSemester,
    private disassociateDisciplineInStudentSemester: DisassociateDisciplineInStudentSemester,
    private findCourseHistoryByStudentRegistrationBySemesterByDisciplineId: FindCourseHistoryByStudentRegistrationBySemesterByDisciplineId,
    private findDisciplinesHistoryByStudentRegistrationBySemester: FindDisciplinesHistoryByStudentRegistrationBySemester,
    private findDisciplinesHistoryByStudentRegistration: FindDisciplinesHistoryByStudentRegistration,
    private findCourseHistoryByStatusAndStudentRegistration: FindCourseHistoryByStatusAndStudentRegistration,
    private createExtracurricularActivity: CreateExtraCurricularActivity,
    private deleteExtraCurricular: DeleteExtraCurricular,
    private findExtraCurricularActivityByStudent: FindExtraCurricularActivityByStudent,
    private listDisciplinesHistoryTodo: ListDisciplinesHistoryTodo,
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
  @ApiResponse({ type: StudentResponseWithMessage })
  async getStudent(@Param('id') id: string) {
    const { student } = await this.findStudent.execute({ studentId: id });

    return {
      message: 'Estudante encontrado!',
      student: StudentViewModel.toHTTP(student),
    };
  }

  @Post()
  @ApiResponse({ type: StudentResponseWithMessage })
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

  //semester

  @Post(':studentRegistration/semester/:semester')
  @ApiResponse({ type: CourseHistoryToFrontResponse })
  async addDisciplineInSemester(
    @Body() request: AssociateDisciplineInStudentSemesterBody,
    @Param('studentRegistration') studentRegistration: string,
    @Param('semester') semester: number,
  ) {
    const { disciplines } = request;
    const courseHistories: CourseHistory[] = [];

    for (const discipline of disciplines) {
      const { courseHistory } =
        await this.associateDisciplineInStudentSemester.execute({
          ...discipline,
          semester: semester,
          studentRegistration: studentRegistration,
        });
      courseHistories.push(courseHistory);
    }

    return {
      message: 'Disciplina(s) associada(s) com sucesso!',
      disciplineHistory: CourseHistoryViewModel.toFront(courseHistories),
    };
  }

  @Delete(':studentRegistration/semester/:semester/disciplines/:disciplineId')
  async disassociateDisciplineInSemester(
    @Param('studentRegistration') studentRegistration: string,
    @Param('semester') semester: number,
    @Param('disciplineId') disciplineId: string,
  ) {
    const { courseHistory } =
      await this.findCourseHistoryByStudentRegistrationBySemesterByDisciplineId.execute(
        { disciplineId, semester, studentRegistration },
      );
    const { courseHistory: courseHistoryDeleted } =
      await this.disassociateDisciplineInStudentSemester.execute({
        courseHistoryId: courseHistory.id.toString(),
      });

    return {
      message: 'Disciplina dessasociada com sucesso!',
      discipline: CourseHistoryViewModel.toHTTP(courseHistoryDeleted),
    };
  }

  @Get(':studentRegistration/semester/:semester/disciplines')
  async findDisciplinesBySemester(
    @Param('studentRegistration') studentRegistration: string,
    @Param('semester') semester: number,
  ) {
    const { courseHistories } =
      await this.findDisciplinesHistoryByStudentRegistrationBySemester.execute({
        semester,
        studentRegistration,
      });

    return {
      disciplineHistory: CourseHistoryViewModel.toFront(courseHistories),
    };
  }

  @Get(':studentRegistration/disciplines')
  async findDisciplinesByStudents(
    @Param('studentRegistration') studentRegistration: string,
  ) {
    const { courseHistories } =
      await this.findDisciplinesHistoryByStudentRegistration.execute({
        studentRegistration,
      });

    return {
      disciplineHistory: CourseHistoryViewModel.toFront(courseHistories),
    };
  }

  @Get(':studentRegistration/disciplines/todo')
  async findDisciplinesTodoByStudents(
    @Param('studentRegistration') studentRegistration: string,
    @Body() body: FindDisciplinesTodoBody,
  ) {
    const { disciplinesTodo } = await this.listDisciplinesHistoryTodo.execute({
      studentRegistration,
      curriculumId: body.curriculumId,
    });

    return {
      disciplines: DisciplineViewModel.toFront(disciplinesTodo),
    };
  }

  @Get(':studentRegistration/disciplines/status/:status')
  async findDisciplinesByStatusAndStudent(
    @Param('studentRegistration') studentRegistration: string,
    @Param('status') status: StatusType,
  ) {
    const { courseHistory } =
      await this.findCourseHistoryByStatusAndStudentRegistration.execute({
        studentRegistration,
        status,
      });

    return {
      disciplineHistory: CourseHistoryViewModel.toFront(courseHistory),
    };
  }

  //extracurricularactivity

  @Post(':studentRegistration/extracurricular')
  @ApiResponse({ type: ExtraCurricularActivityResponse })
  async addExtracurricularActivity(
    @Body() body: CreateExtraCurricularActivityBody,
    @Param('studentRegistration') studentRegistration: string,
  ) {
    const { extraCurricularActivity } =
      await this.createExtracurricularActivity.execute({
        ...body,
        studentRegistration,
      });

    return {
      message: 'Atividade extra curricular criada com sucesso!',
      disciplineHistory: ExtraCurricularActivityViewModel.toHTTP(
        extraCurricularActivity,
      ),
    };
  }

  @Delete(':studentRegistration/extracurricular/:extracurricularId')
  async removeExtracurricularActivity(
    @Param('extracurricularId') extracurricularId: string,
  ) {
    const { extraCurricular } = await this.deleteExtraCurricular.execute({
      id: extracurricularId,
    });

    return {
      message: 'Atividade extra curricular deletada com sucesso!',
      discipline: ExtraCurricularActivityViewModel.toHTTP(extraCurricular),
    };
  }

  @Get(':studentRegistration/extracurricular')
  async findExtracurricularActivitiesBySemester(
    @Param('studentRegistration') studentRegistration: string,
  ) {
    const { extraCurricularActivities } =
      await this.findExtraCurricularActivityByStudent.execute({
        studentRegistration,
      });

    return {
      extraCurricularActivities: extraCurricularActivities.map(
        ExtraCurricularActivityViewModel.toHTTP,
      ),
    };
  }
}
