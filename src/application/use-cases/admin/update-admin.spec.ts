import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { UpdateAdmin } from './update-admin';

describe('Update admin', () => {
  it('should be able to update a admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();

    const updateAdmin = new UpdateAdmin(adminsRepository);
    const admin = makeAdmin();
    adminsRepository.create(admin);

    const adminRequest = admin;
    adminRequest.name = 'Fulano';
    adminRequest.username = 'Novo username';

    const { admin: adminUpdated } = await updateAdmin.execute({
      admin: adminRequest,
    });

    expect(adminsRepository.admins[0]).toEqual(adminUpdated);
  });
});
