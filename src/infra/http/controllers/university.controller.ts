import { Discipline } from '@application/entities/discipline/discipline';
import { CreateCurriculum } from '@application/use-cases/curriculum/create-curriculum';
import { FindCurriculumsByUniversityId } from '@application/use-cases/curriculum/find-by-universityId';
import { FindCurriculumsByUniversityIdAndCurriculumId } from '@application/use-cases/curriculum/find-by-universityId-and-curriculumId';
import { CreateDiscipline } from '@application/use-cases/discipline/create-discipline';
import { CreateManyDiscipline } from '@application/use-cases/discipline/create-many-disciplines';
import { FindDiscipline } from '@application/use-cases/discipline/find-discipline';
import { FindDisciplinesByCurriculum } from '@application/use-cases/discipline/find-disciplines-by-curriculum';
import { CreateUniversity } from '@application/use-cases/university/create-university';
import { FindUniversitiesByCity } from '@application/use-cases/university/find-universities-by-city';
import { FindUniversitiesByCityAndState } from '@application/use-cases/university/find-universities-by-city-and-state';
import { FindUniversitiesByState } from '@application/use-cases/university/find-universities-by-state';
import { FindUniversity } from '@application/use-cases/university/find-university';
import { ListUniversities } from '@application/use-cases/university/list-universities';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCurriculumBody } from '../dto/curriculum/create-curriculum.dto';
import { CreateManyDisciplineBody } from '../dto/discipline/create-discipline.dto';
import { ResponseWithMessage } from '../dto/response-message';
import { CreateUniversityBody } from '../dto/university/create-university.dto';
import { CourseHttp } from '../types-class-http/course-http';
import { CurriculumHttp } from '../types-class-http/curriculum-http';
import { UniversityHttp } from '../types-class-http/university-http';
import { ToFront } from '../view-models/course-history-view-model';
import { CurriculumViewModel } from '../view-models/curriculum-view-model';
import { DisciplineViewModel } from '../view-models/discipline-view-model';
import { UniversityViewModel } from '../view-models/university-view-model';

abstract class IGetCurriculumsCoursesByUniversityIdResponse extends CourseHttp {
  @ApiProperty()
  curriculumId: string;
}

abstract class CreateCurriculumResponse extends ResponseWithMessage {
  @ApiProperty()
  curriculum: CurriculumHttp;
}

abstract class UniversityResponse extends ResponseWithMessage {
  @ApiProperty()
  university: UniversityHttp;
}

export abstract class DisciplineToFrontResponse {
  @ApiProperty({ isArray: true, type: ToFront })
  disciplines: ToFront[];
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
    private findCurriculumsByUniversityIdAndCurriculumId: FindCurriculumsByUniversityIdAndCurriculumId,
    private createDiscipline: CreateDiscipline,
    private createManyDiscipline: CreateManyDiscipline,
    private findDiscipline: FindDiscipline,
    private findDisciplineByCurriculum: FindDisciplinesByCurriculum,
    private findUniversitiesByCityAndState: FindUniversitiesByCityAndState,
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

  @Get('/state/:state/city/:city')
  @ApiResponse({
    type: UniversityHttp,
    isArray: true,
    description: 'Busca Universidades por Estado e Cidade',
  })
  async listAllUniversitiesByStateAndByCity(
    @Param('state') state: string,
    @Param('city') city: string,
  ) {
    const { universities } = await this.findUniversitiesByCityAndState.execute({
      state,
      city,
    });

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

    const curriculumsHttp = curriculums.map(CurriculumViewModel.toHTTP);

    const courses = curriculumsHttp.map((curriculum) => {
      return {
        course: {
          ...curriculum.curriculumCourse,
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
    @Param('id') universityId: string,
  ) {
    const { curriculum } = await this.createCurriculum.execute({
      ...createCurriculumBody,
      universityId,
    });

    return {
      message: 'Matriz curricular do curso cadastrada com sucesso!',

      curriculum: CurriculumViewModel.toHTTP(curriculum),
    };
  }

  @Get(':id/courses/:curriculumId')
  async getCurriculumCourseByCurriculumId(
    @Param('id') universityId: string,
    @Param('curriculumId') curriculumId: string,
  ) {
    const { curriculum } =
      await this.findCurriculumsByUniversityIdAndCurriculumId.execute({
        universityId,
        curriculumId,
      });

    return {
      course: CurriculumViewModel.toHTTP(curriculum),
    };
  }

  @Post(':id/courses/:curriculumId/disciplines')
  async associateDisciplineInCurriculum(
    @Param('curriculumId') curriculumId: string,
    @Body() disciplineBody: CreateManyDisciplineBody,
  ) {
    const disciplines: Discipline[] = [];
    const codErrors: string[] = [];
    let message = '';
    for (const discipline of disciplineBody.disciplines) {
      const {
        discipline: disciplineUseCase,
        error,
        cod,
      } = await this.createDiscipline.execute({
        ...discipline,
        curriculumId,
      });

      if (!error) {
        disciplines.push(disciplineUseCase);
      }
      if (cod) {
        codErrors.push(cod);
      }
    }

    if (codErrors.length > 0) {
      message = 'Codigos de disciplinas que houve erro ao cadastra-la:';
    }

    return {
      disciplines: DisciplineViewModel.toFront(disciplines),
      message,
      codErrors: codErrors,
    };
  }

  @Get(':id/courses/:curriculumId/disciplines')
  @ApiResponse({
    type: DisciplineToFrontResponse,
    description: 'Busca as disciplinas de uma matriz curricular',
  })
  async findDisciplinesByCurriculum(
    @Param('curriculumId') curriculumId: string,
  ) {
    const { disciplines } = await this.findDisciplineByCurriculum.execute({
      curriculumId,
    });
    return {
      disciplines: DisciplineViewModel.toFront(disciplines),
    };
  }

  @Get(':id/courses/:curriculumId/disciplines/:disciplineId')
  async findDisciplineById(@Param('disciplineId') disciplineId: string) {
    const { discipline } = await this.findDiscipline.execute({
      disciplineId,
    });
    return {
      discipline: DisciplineViewModel.toHTTP(discipline),
    };
  }
}
