import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { AdminNotFound } from '../errors/admin-not-found';
import { DeleteAdmin } from './delete-admin';

describe('Delete admin', () => {
  it('should be able to delete a admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();

    const admin = makeAdmin();
    adminsRepository.create(admin);

    const deleteAdmin = new DeleteAdmin(adminsRepository);

    const { admin: adminDeleted } = await deleteAdmin.execute({
      adminId: admin.adminId.toString(),
    });

    expect(adminsRepository.admins).toHaveLength(0);
    expect(admin).toEqual(adminDeleted);
  });

  it('should not be able to delete a admin if non existing admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();

    const deleteAdmin = new DeleteAdmin(adminsRepository);

    expect(() => {
      return deleteAdmin.execute({
        adminId: 'fake admin id',
      });
    }).rejects.toThrow(AdminNotFound);
  });
});
