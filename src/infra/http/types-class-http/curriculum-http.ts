import { ApiProperty } from '@nestjs/swagger';
import { CourseHttp } from './course-http';
import { UniversityHttp } from './university-http';

export class CurriculumHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  course: CourseHttp;

  @ApiProperty()
  description: string;

  @ApiProperty()
  extraCurricularHours: number;

  @ApiProperty()
  optionalHours: number;
  @ApiProperty()
  requiredHours: number;

  @ApiProperty()
  university: UniversityHttp;
}
