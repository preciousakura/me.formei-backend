import { City } from '../city/city';
import { State } from '../state/state';
import { Admin } from './admin';

describe('Admin', () => {
  it('should be able to create a admin', () => {
    const admin = Admin.create({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      city: City.create({
        name: 'city name',
        state: State.create({
          name: 'example state name',
        }),
      }),
      lastname: 'example lastname',
      state: 'example state',
      username: 'example username',
    });

    expect(admin).toBeTruthy();
  });
});
