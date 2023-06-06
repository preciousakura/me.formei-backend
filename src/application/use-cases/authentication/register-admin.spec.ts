import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserAlreadyExists } from '../errors/user-already-exists';
import { EncriptionPassword } from './encription-password';
import { RegisterAccountAdmin } from './register-admin';

describe('Register admin', () => {
  it('should be able to register a admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const encriptionPassword = new EncriptionPassword();


    const registerAdmin = new RegisterAccountAdmin(
      adminsRepository,
      usersRepository,
      encriptionPassword,
    );

    const Admin = makeAdmin();

    const { admin: adminUpdated } = await registerAdmin.execute({
      email: Admin.email,
      city: Admin.city,
      state: Admin.state,
      lastname: Admin.lastname,
      name: Admin.name,
      password: Admin.password,
      username: Admin.username,
    });

    expect(adminsRepository.admins[0]).toEqual(adminUpdated);
  });

  it('should not be able to create a admin if existing a admin with email and username match', async () => {
    const adminsRepository = new InMemoryAdminsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const encriptionPassword = new EncriptionPassword();

    const Admin = makeAdmin();

    adminsRepository.create(Admin);

    const registerAdmin = new RegisterAccountAdmin(
      adminsRepository,
      usersRepository,
      encriptionPassword,
    );

    expect(() => {
      return registerAdmin.execute({
        email: Admin.email,
        city: Admin.city,
        state: Admin.state,
        lastname: Admin.lastname,
        name: Admin.name,
        password: Admin.password,
        username: Admin.username,
      });
    }).rejects.toThrow(UserAlreadyExists);
  });
});
