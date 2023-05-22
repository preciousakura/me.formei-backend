import { City } from '../city/city';
import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = User.create({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      city: City.create({ name: 'city name', stateId: 'example-state-id' }),
      lastname: 'example lastname',
      state: 'example state',
      username: 'example username',
    });

    expect(user).toBeTruthy();
  });
});
