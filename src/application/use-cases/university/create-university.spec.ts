import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { CreateUniversity } from './create-university';

describe('Create university', () => {
  it('should be able to create a university', async () => {
    const universitiesRepository = new InMemoryUniversitiesRepository();
    const createUniversity = new CreateUniversity(universitiesRepository);

    const { university } = await createUniversity.execute({
      name: 'Example university',
      abv: 'Example abv',
    });

    expect(universitiesRepository.universities).toHaveLength(1);
    expect(universitiesRepository.universities[0]).toEqual(university);
  });
});
