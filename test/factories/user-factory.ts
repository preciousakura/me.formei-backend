import { User, UserProps } from '@application/entities/user/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return User.create({
    name: 'Example name',
    email: 'email@example.com',
    password: 'password123',
    city:'example city',
    lastname: 'example lastname',
    state: 'example state',
    username: 'example username',
    ...override,
  });
}
