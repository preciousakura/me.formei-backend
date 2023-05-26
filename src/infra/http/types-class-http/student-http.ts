import { ApiProperty } from '@nestjs/swagger';
import { CityHttp } from './city-http';
import { CourseHttp } from './course-http';
import { UniversityHttp } from './university-http';

export class StudentHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ description: 'Matricula do aluno', example: '493450' })
  registration: string;

  @ApiProperty()
  curriculumId: string;

  @ApiProperty()
  course: CourseHttp;

  @ApiProperty({ example: 7 })
  currentSemester: string;

  @ApiProperty({ description: '1 ou 2', example: 1 })
  enrollmentSemester: string;

  @ApiProperty({ example: '2023' })
  enrollmentYear: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  university: UniversityHttp;

  @ApiProperty()
  username: string;

  @ApiProperty()
  city: CityHttp;
}