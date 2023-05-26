import { Admin, AdminProps } from '@application/entities/admin/admin';
import { makeCity } from './city-factory';

type Override = Partial<AdminProps>;

export function makeAdmin(override: Override = {}) {
  return Admin.create({
    name: 'Example name',
    email: 'email@example.com',
    password: 'password123',
    username: 'Example username',
    city: makeCity(),
    lastname: 'Example lastname',
    state: 'Example state',
    ...override,
  });
}
