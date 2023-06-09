import { Curriculum } from '@application/entities/curriculum/curriculum';
import { ApiProperty } from '@nestjs/swagger';
import { CourseViewModel } from './course-view-model';
import { UniversityViewModel } from './university-view-model';

export class CurriculumViewModel {
  @ApiProperty()
  static toHTTP(curriculum: Curriculum) {
    const {
      course,
      description,
      extraCurricularHours,
      id,
      optionalHours,
      requiredHours,
      university,
    } = curriculum;

    return {
      id: id.toValue(),
      course: CourseViewModel.toHTTP(course),
      description,
      extraCurricularHours,
      optionalHours,
      requiredHours,
      university: UniversityViewModel.toHTTP(university),
    };
  }
}
