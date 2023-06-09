import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CreateAdmin } from './create-admin';

describe('Create admin', () => {
  it('should be able to create a admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();
    const usersRepository = new InMemoryUsersRepository();

    const createAdmin = new CreateAdmin(adminsRepository, usersRepository);

    const { admin, user } = await createAdmin.execute({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      city: 'example city',
      state: 'example state',
      lastname: 'Example lastname',
      username: 'Example username',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);

    expect(adminsRepository.admins).toHaveLength(1);
    expect(adminsRepository.admins[0]).toEqual(admin);
  });
});
