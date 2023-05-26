import { makeCity } from '@test/factories/city-factory';
import { makeState } from '@test/factories/state-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { InMemoryCitiesRepository } from '@test/repositories/in-memory-cities-repository';
import { InMemoryStatesRepository } from '@test/repositories/in-memory-states-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { CityNotFound } from '../errors/city-not-found';
import { CreateAdmin } from './create-admin';

describe('Create admin', () => {
  it('should be able to create a admin', async () => {
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

    const createAdmin = new CreateAdmin(
      adminsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
    );

    const { admin, user } = await createAdmin.execute({
      name: 'Example name',
      email: 'email@example.com',
      password: 'password123',
      cityId: city.id.toString(),
      lastname: 'Example lastname',
      username: 'Example username',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);

    expect(adminsRepository.admins).toHaveLength(1);
    expect(adminsRepository.admins[0]).toEqual(admin);
  });

  it('should not be able to create a admin if non existing city', async () => {
    const adminsRepository = new InMemoryAdminsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const citiesRepository = new InMemoryCitiesRepository();
    const statesRepository = new InMemoryStatesRepository();

    const createAdmin = new CreateAdmin(
      adminsRepository,
      usersRepository,
      citiesRepository,
      statesRepository,
    );

    expect(() => {
      return createAdmin.execute({
        name: 'Example name',
        email: 'email@example.com',
        password: 'password123',
        cityId: 'fake city id',
        lastname: 'Example lastname',
        username: 'Example username',
      });
    }).rejects.toThrow(CityNotFound);
  });
});
