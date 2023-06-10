import { CreateCurriculum } from '@application/use-cases/curriculum/create-curriculum';
import { FindCurriculumsByUniversityId } from '@application/use-cases/curriculum/find-by-universityId';
import { CreateUniversity } from '@application/use-cases/university/create-university';
import { FindUniversitiesByCity } from '@application/use-cases/university/find-universities-by-city';
import { FindUniversitiesByState } from '@application/use-cases/university/find-universities-by-state';
import { FindUniversity } from '@application/use-cases/university/find-university';
import { ListUniversities } from '@application/use-cases/university/list-universities';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCurriculumBody } from '../dto/curriculum/create-curriculum.dto';
import { ResponseWithMessage } from '../dto/response-message';
import { CreateUniversityBody } from '../dto/university/create-university.dto';
import { CourseHttp } from '../types-class-http/course-http';
import { CurriculumHttp } from '../types-class-http/curriculum-http';
import { UniversityHttp } from '../types-class-http/university-http';
import { CurriculumViewModel } from '../view-models/curriculum-view-model';
import { UniversityViewModel } from '../view-models/university-view-model';

abstract class IGetCurriculumsCoursesByUniversityIdResponse extends CourseHttp {
  @ApiProperty()
  curriculumId: string;
}

abstract class CreateCurriculumResponse extends ResponseWithMessage {
  @ApiProperty()
  course: CurriculumHttp;
}

abstract class UniversityResponse extends ResponseWithMessage {
  @ApiProperty()
  university: UniversityHttp;
}

@Controller('universities')
@ApiTags('Universidades')
export class UniversitiesController {
  constructor(
    private createUniversity: CreateUniversity,
    private listUniversities: ListUniversities,
    private findUniversity: FindUniversity,
    private findCurriculumsByUniversityId: FindCurriculumsByUniversityId,
    private findUniversitiesByState: FindUniversitiesByState,
    private findUniversitiesByCity: FindUniversitiesByCity,
    private createCurriculum: CreateCurriculum,
  ) {}

  @Get()
  @ApiResponse({
    type: UniversityHttp,
    isArray: true,
    description: 'Lista todos as universidades cadastradas no sistema',
  })
  async listAllUniversities() {
    const { universities } = await this.listUniversities.execute();

    return {
      universities: universities.map(UniversityViewModel.toHTTP),
    };
  }

  @Get('/state/:state')
  @ApiResponse({
    type: UniversityHttp,
    isArray: true,
    description: 'Busca Universidades por Estado',
  })
  async listAllUniversitiesByState(@Param('state') state: string) {
    const { universities } = await this.findUniversitiesByState.execute({
      state,
    });

    return {
      universities: universities.map(UniversityViewModel.toHTTP),
    };
  }

  @Get('/city/:city')
  @ApiResponse({
    type: UniversityHttp,
    isArray: true,
    description: 'Busca Universidades por Cidade',
  })
  async listAllUniversitiesByCity(@Param('city') city: string) {
    const { universities } = await this.findUniversitiesByCity.execute({
      city,
    });

    return {
      universities: universities.map(UniversityViewModel.toHTTP),
    };
  }

  @Get(':id')
  @ApiResponse({
    type: UniversityResponse,
    description: 'Busca Universidade pelo id',
  })
  async getUniversity(@Param('id') id: string) {
    const { university } = await this.findUniversity.execute({
      universityId: id,
    });
    return {
      message: 'Universidade encontrada!',
      university: UniversityViewModel.toHTTP(university),
    };
  }

  @Post()
  @ApiResponse({
    type: UniversityResponse,
    description: 'Registra uma Universidade',
  })
  async postUniversity(@Body() createUniversityBody: CreateUniversityBody) {
    const { university } = await this.createUniversity.execute(
      createUniversityBody,
    );

    return {
      message: 'Universidade criada!',
      university: UniversityViewModel.toHTTP(university),
    };
  }

  @Get(':id/courses')
  @ApiResponse({
    type: IGetCurriculumsCoursesByUniversityIdResponse,
    isArray: true,
    description: 'Busca as matrizes curriculares (Cursos) por universidade',
  })
  async getCurriculumsCoursesByUniversityId(@Param('id') id: string) {
    const { curriculums } = await this.findCurriculumsByUniversityId.execute({
      universityId: id,
    });
    if (curriculums.length === 0) {
      return { curriculums };
    }
    const courses = curriculums.map((curriculum) => {
      return {
        course: {
          ...curriculum.course,
          curriculumId: curriculum.id.toString(),
        },
      };
    });
    return {
      courses,
    };
  }

  @Post(':id/courses')
  @ApiResponse({
    type: CreateCurriculumResponse,
    description: 'Registra uma matriz curricular (Curso) na Universidade',
  })
  async registerCurriculumCourseInUniversity(
    @Body() createCurriculumBody: CreateCurriculumBody,
  ) {
    const { curriculum } = await this.createCurriculum.execute(
      createCurriculumBody,
    );

    return {
      message: 'Matriz curricular do curso cadastrada com sucesso!',

      course: CurriculumViewModel.toHTTP(curriculum),
    };
  }
}
