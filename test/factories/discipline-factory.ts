import {
  Discipline,
  DisciplineProps,
} from '@application/entities/discipline/discipline';

export type Override = Partial<DisciplineProps>;

export function makeDiscipline(override: Override = {}) {
  return Discipline.create({
    cod: 'example code',
    optional: false,
    name: 'Example name',
    courseOutline: 'xxx',
    semester: 1,
    description: 'Example description',
    curriculumId: 'example-curriculum-id',
    prerequisiteDisciplines: [],
    ...override,
  });
}
