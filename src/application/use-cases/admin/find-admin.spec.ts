import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { FindAdmin } from './find-admin';

describe('Find admin', () => {
  it('should be able to find a admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();

    const findAdmin = new FindAdmin(adminsRepository);
    const admin = makeAdmin();
    adminsRepository.create(admin);

    const { admin: findedAdmin } = await findAdmin.execute({
      adminId: admin.adminId.toString(),
    });

    expect(adminsRepository.admins[0]).toEqual(findedAdmin);
  });
});
