import { Discipline } from '@application/entities/discipline/discipline';
import { ApiProperty } from '@nestjs/swagger';

export class DisciplineViewModel {
  @ApiProperty()
  static toHTTP(discipline: Discipline) {
    const {
      cod,
      courseOutline,
      curriculumId,
      description,
      id,
      name,
      optional,
      semester,
    } = discipline;

    return {
      id: id.toValue(),
      name,
      cod,
      courseOutline,
      curriculumId,
      description,
      optional,
      semester,
    };
  }
}
