import { makeAdmin } from '@test/factories/admin-factory';

describe('Admin', () => {
  it('should be able to create a admin', () => {
    const admin = makeAdmin();

    expect(admin).toBeTruthy();
  });
});
