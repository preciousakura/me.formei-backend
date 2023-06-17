import { CreateCourse } from '@application/use-cases/course/create-course';
import { FindCourse } from '@application/use-cases/course/find-course';
import { ListCourses } from '@application/use-cases/course/list-courses';
import { UpdateCourse } from '@application/use-cases/course/update-course';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCourseBody } from '../dto/course/create-course.dto';
import { UpdateCourseBody } from '../dto/course/update-course.dto';
import { ResponseWithMessage } from '../dto/response-message';
import { CourseHttp } from '../types-class-http/course-http';
import { CourseViewModel } from '../view-models/course-view-model';

abstract class CourseResponse {
  @ApiProperty()
  course: CourseHttp;
}

@Controller('courses')
@ApiTags('Cursos')
export class CoursesController {
  constructor(
    private createCourse: CreateCourse,
    private listCourses: ListCourses,
    private findCourse: FindCourse,
    private updateCourse: UpdateCourse,
  ) {}

  @Get()
  @ApiResponse({
    type: CourseResponse,
    isArray: true,
    description: 'Lista todos os cursos cadastrados no sistema',
  })
  async listAllCourses() {
    const { courses } = await this.listCourses.execute();

    return {
      courses: courses.map(CourseViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiResponse({
    type: CourseResponse && ResponseWithMessage,
    description: 'Busca um curso cadastrado no sistema',
  })
  async getCourse(@Param('id') id: string) {
    const { course } = await this.findCourse.execute({ courseId: id });
    return {
      message: 'Curso encontrado!',
      course: CourseViewModel.toHTTP(course),
    };
  }

  @Post()
  @ApiResponse({
    type: CourseResponse && ResponseWithMessage,
    description: 'Cadastra curso no sistema',
  })
  async postCourse(@Body() createCourseBody: CreateCourseBody) {
    const { course } = await this.createCourse.execute(createCourseBody);

    return {
      message: 'Curso criado!',
      course: CourseViewModel.toHTTP(course),
    };
  }

  @Patch(':id')
  @ApiResponse({
    type: CourseResponse && ResponseWithMessage,
    description: 'Atualiza um curso cadastrado no sistema',
  })
  async updateCourseById(
    @Param('id') id: string,
    @Body() updateCourseBody: UpdateCourseBody,
  ) {
    const { course } = await this.updateCourse.execute({
      id,
      course: updateCourseBody,
    });

    return {
      message: 'Curso atualizado!',
      course: CourseViewModel.toHTTP(course),
    };
  }
}
