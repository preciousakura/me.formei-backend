import { Admin, AdminProps } from '@application/entities/admin/admin';


type Override = Partial<AdminProps>;

export function makeAdmin(override: Override = {}) {
  return Admin.create({
    name: 'Example name',
    email: 'email@example.com',
    password: 'password123',
    username: 'Example username',
    city: 'Example city',
    lastname: 'Example lastname',
    state: 'Example state',
    ...override,
  });
}
