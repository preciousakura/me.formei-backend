import { City } from '../city/city';
import { Admin } from './admin';

describe('Admin', () => {
  it('should be able to create a admin', () => {
    const admin = Admin.create({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      city: City.create({ name: 'city name', stateId: 'example-state-id' }),
      lastname: 'example lastname',
      state: 'example state',
      username: 'example username',
    });

    expect(admin).toBeTruthy();
  });
});
