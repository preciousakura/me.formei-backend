import { CreateCourse } from '@application/use-cases/course/create-course';
import { FindCourse } from '@application/use-cases/course/find-course';
import { ListCourses } from '@application/use-cases/course/list-courses';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCourseBody } from '../dto/course/create-course.dto';
import { CourseHttp } from '../types-class-http/course-http';
import { StudentHttp } from '../types-class-http/student-http';
import { CourseViewModel } from '../view-models/course-view-model';

export class ResponseStudent {
  @ApiProperty()
  message: string;
  @ApiProperty()
  student: StudentHttp;
}

@Controller('courses')
@ApiTags('Cursos')
export class CoursesController {
  constructor(
    private createCourse: CreateCourse,
    private listCourses: ListCourses,
    private findCourse: FindCourse,
  ) {}

  @Get()
  @ApiResponse({
    type: CourseHttp,
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
  async getCourse(@Param('id') id: string) {
    const { course } = await this.findCourse.execute({ courseId: id });
    return {
      message: 'Curso encontrado!',
      course: CourseViewModel.toHTTP(course),
    };
  }

  @Post()
  async postCourse(@Body() createCourseBody: CreateCourseBody) {
    const { course } = await this.createCourse.execute(createCourseBody);

    return {
      message: 'Curso criado!',

      course: CourseViewModel.toHTTP(course),
    };
  }
}
