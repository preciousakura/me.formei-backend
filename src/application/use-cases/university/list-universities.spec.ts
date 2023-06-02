import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { ListUniversities } from './list-universities';

describe('List universities', () => {
  it('should be able to list a universities', async () => {
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const listUniversities = new ListUniversities(universitiesRepository);
    const university1 = makeUniversity();
    const university2 = makeUniversity();
    const university3 = makeUniversity();
    universitiesRepository.create(university1);
    universitiesRepository.create(university2);
    universitiesRepository.create(university3);
    const { universities } = await listUniversities.execute();

    expect(universitiesRepository.universities).toEqual(universities);
    expect(universitiesRepository.universities[0]).toEqual(university1);
    expect(universitiesRepository.universities[1]).toEqual(university2);
    expect(universitiesRepository.universities[2]).toEqual(university3);
  });
});
