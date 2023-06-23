import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { UpdateUniversity } from './update-university';

describe('Update university', () => {
  it('should be able to update a university', async () => {
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const updateUniversity = new UpdateUniversity(universitiesRepository);
    const university = makeUniversity();
    universitiesRepository.create(university);

    const universityRequest = university;
    universityRequest.name = 'Universidade Tal';
    universityRequest.abv = 'UFT';

    const { university: universityUpdated } = await updateUniversity.execute({
      id: universityRequest.id.toString(),
      university: universityRequest,
    });

    expect(universitiesRepository.universities[0]).toEqual(universityUpdated);
  });
});
