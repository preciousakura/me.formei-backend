import { City, CityProps } from '@application/entities/city/city';
import { makeState } from './state-factory';

type Override = Partial<CityProps>;

export function makeCity(override: Override = {}) {
  return City.create({
    name: 'example name state',
    state: makeState(),
    ...override,
  });
}
