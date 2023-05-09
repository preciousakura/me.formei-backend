import { Admin } from './admin';

describe('Admin', () => {
  it('should be able to create a admin', () => {
    const admin = new Admin({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
    });

    expect(admin).toBeTruthy();
  });
});
