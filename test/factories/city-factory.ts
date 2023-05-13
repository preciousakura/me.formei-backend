import { City, CityProps } from '@application/entities/city/city';

type Override = Partial<CityProps>;

export function makeCity(override: Override = {}) {
  return City.create({
    name: 'example name state',
    stateId: 'example-state-id',
    ...override,
  });
}
