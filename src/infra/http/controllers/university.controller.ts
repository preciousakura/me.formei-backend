import { CreateCurriculum } from '@application/use-cases/curriculum/create-curriculum';
import { FindCurriculumsByUniversityId } from '@application/use-cases/curriculum/find-by-universityId';
import { CreateUniversity } from '@application/use-cases/university/create-university';
import { FindUniversitiesByCity } from '@application/use-cases/university/find-universities-by-city';
import { FindUniversitiesByState } from '@application/use-cases/university/find-universities-by-state';
import { FindUniversity } from '@application/use-cases/university/find-university';
import { ListUniversities } from '@application/use-cases/university/list-universities';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCurriculumBody } from '../dto/curriculum/create-curriculum.dto';
import { CreateUniversityBody } from '../dto/university/create-university.dto';
import { UniversityHttp } from '../types-class-http/university-http';
import { CurriculumViewModel } from '../view-models/curriculum-view-model';
import { UniversityViewModel } from '../view-models/university-view-model';

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
  async listAllUniversitiesByState(@Param('state') state: string) {
    const { universities } = await this.findUniversitiesByState.execute({
      state,
    });

    return {
      universities: universities.map(UniversityViewModel.toHTTP),
    };
  }

  @Get('/city/:city')
  async listAllUniversitiesByCity(@Param('city') city: string) {
    const { universities } = await this.findUniversitiesByCity.execute({
      city,
    });

    return {
      universities: universities.map(UniversityViewModel.toHTTP),
    };
  }

  @Get(':id')
  async getUniversity(@Param('id') id: string) {
    const { university } = await this.findUniversity.execute({
      universityId: id,
    });
    return {
      message: 'Universidade encontrada!',
      university: UniversityViewModel.toHTTP(university),
    };
  }

  @Post(':id')
  async postUniversity(@Body() createUniversityBody: CreateUniversityBody) {
    const { university } = await this.createUniversity.execute(
      createUniversityBody,
    );

    return {
      message: 'Universidade criada!',

      student: UniversityViewModel.toHTTP(university),
    };
  }

  @Get(':id/courses')
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
  async registerCurriculumCourseInUniversity(
    @Body() createCurriculumBody: CreateCurriculumBody,
  ) {
    const { curriculum } = await this.createCurriculum.execute(
      createCurriculumBody,
    );

    return {
      message: 'Matriz curricular do curso cadastrada com sucesso!',

      student: CurriculumViewModel.toHTTP(curriculum),
    };
  }
}
