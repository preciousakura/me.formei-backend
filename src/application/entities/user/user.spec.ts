import { makeCity } from '@test/factories/city-factory';
import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = User.create({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      city: makeCity(),
      lastname: 'example lastname',
      state: 'example state',
      username: 'example username',
    });

    expect(user).toBeTruthy();
  });
});
