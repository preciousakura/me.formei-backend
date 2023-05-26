import { makeUniversity } from '@test/factories/university-factory';

describe('University', () => {
  it('should be able to create a university', () => {
    const university = makeUniversity();
    expect(university).toBeTruthy();
  });
});
