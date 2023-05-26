import { makeAdmin } from '@test/factories/admin-factory';
import { makeCity } from '@test/factories/city-factory';
import { makeState } from '@test/factories/state-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { InMemoryCitiesRepository } from '@test/repositories/in-memory-cities-repository';
import { InMemoryStatesRepository } from '@test/repositories/in-memory-states-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserAlreadyExists } from '../errors/user-already-exists';
import { RegisterAccountAdmin } from './register-admin';

describe('Register admin', () => {
  it('should be able to register a admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();

    const state = makeState();

    statesRepository.create(state);

    const city = makeCity({
      state: state,
    });

    citiesRepository.create(city);

    const registerAdmin = new RegisterAccountAdmin(
      adminsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
    );

    const Admin = makeAdmin({ city: city });

    const { admin: adminUpdated } = await registerAdmin.execute({
      email: Admin.email,
      cityId: Admin.city.id.toString(),
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
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();

    const state = makeState();

    statesRepository.create(state);

    const city = makeCity({
      state: state,
    });

    citiesRepository.create(city);

    const Admin = makeAdmin();

    adminsRepository.create(Admin);

    const registerAdmin = new RegisterAccountAdmin(
      adminsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
    );

    expect(() => {
      return registerAdmin.execute({
        email: Admin.email,
        cityId: city.id.toString(),
        lastname: Admin.lastname,
        name: Admin.name,
        password: Admin.password,
        username: Admin.username,
      });
    }).rejects.toThrow(UserAlreadyExists);
  });
});
