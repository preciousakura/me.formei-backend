import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { UniversityNotFound } from '../errors/university-not-found';
import { DeleteUniversity } from './delete-university';

describe('Delete university', () => {
  it('should be able to delete a university', async () => {
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const university = makeUniversity();
    universitiesRepository.create(university);

    const deleteUniversity = new DeleteUniversity(universitiesRepository);

    const { university: universityDeleted } = await deleteUniversity.execute({
      universityId: university.id.toString(),
    });

    expect(universitiesRepository.universities).toHaveLength(0);
    expect(university).toEqual(universityDeleted);
  });

  it('should not be able to delete a university if non existing university', async () => {
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const deleteUniversity = new DeleteUniversity(universitiesRepository);

    expect(() => {
      return deleteUniversity.execute({
        universityId: 'fake sniversity id',
      });
    }).rejects.toThrow(UniversityNotFound);
  });
});
