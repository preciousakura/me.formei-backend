import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { FindUniversity } from './find-university';

describe('Find university', () => {
  it('should be able to find a university', async () => {
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const findUniversity = new FindUniversity(universitiesRepository);
    const university = makeUniversity();
    universitiesRepository.create(university);

    const { university: findedUniversity } = await findUniversity.execute({
      universityId: university.id.toString(),
    });

    expect(universitiesRepository.universities[0]).toEqual(findedUniversity);
  });
});
