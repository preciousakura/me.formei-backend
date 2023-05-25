import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { ListAdmins } from './list-admins';

describe('List admins', () => {
  it('should be able to list a admins', async () => {
    const adminsRepository = new InMemoryAdminsRepository();

    const listAdmins = new ListAdmins(adminsRepository);
    const admin1 = makeAdmin();
    const admin2 = makeAdmin();
    const admin3 = makeAdmin();
    adminsRepository.create(admin1);
    adminsRepository.create(admin2);
    adminsRepository.create(admin3);
    const { admins } = await listAdmins.execute();

    expect(adminsRepository.sdmins).toEqual(admins);
    expect(adminsRepository.admins[0]).toEqual(admin1);
    expect(adminsRepository.admins[1]).toEqual(admin2);
    expect(adminsRepository.admins[2]).toEqual(admin3);
  });
});
