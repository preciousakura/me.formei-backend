import { Course } from '@application/entities/curriculum/course';
import {
  Curriculum,
  CurriculumProps,
} from '@application/entities/curriculum/curriculum';
import { University } from '@application/entities/curriculum/university';

type Override = Partial<CurriculumProps>;

export function makeCurriculum(override: Override = {}) {
  return Curriculum.create({
    course: Course.create({
      name: 'example-name',
    }),
    description: 'Example description',
    university: University.create({
      name: 'example university-name',
      abv: 'example abv',
    }),
    extraCurricularHours: 192,
    optionalHours: 1200,
    requiredHours: 3200,
    ...override,
  });
}
