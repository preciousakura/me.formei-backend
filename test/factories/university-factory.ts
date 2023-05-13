import {
  University,
  UniversityProps,
} from '@application/entities/curriculum/university';

type Override = Partial<UniversityProps>;

export function makeUniversity(override: Override = {}) {
  return University.create({
    name: 'example name state',
    abv: 'example abv',
    ...override,
  });
}
