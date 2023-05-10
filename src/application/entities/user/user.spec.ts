import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = User.create({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
    });

    expect(user).toBeTruthy();
  });
});
