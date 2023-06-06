import { Course } from '@application/entities/curriculum/course';
import {
  Curriculum,
  CurriculumProps,
} from '@application/entities/curriculum/curriculum';

import { makeUniversity } from './university-factory';

type Override = Partial<CurriculumProps>;

export function makeCurriculum(override: Override = {}) {
  return Curriculum.create({
    course: Course.create({
      name: 'example-name',
    }),
    description: 'Example description',
    university: makeUniversity(),
    extraCurricularHours: 192,
    optionalHours: 1200,
    requiredHours: 3200,
    ...override,
  });
}
