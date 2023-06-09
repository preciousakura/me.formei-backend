import { makeDiscipline } from '@test/factories/discipline-factory';
import { InMemoryDisciplinesRepository } from '@test/repositories/in-memory-disciplines-repository';
import { DisciplineNotFound } from '../errors/discipline-not-found';
import { DeleteDiscipline } from './delete-discipline';

describe('Delete discipline', () => {
  it('should be able to delete a discipline', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();

    const discipline = makeDiscipline();
    disciplinesRepository.create(discipline);

    const deleteDiscipline = new DeleteDiscipline(disciplinesRepository);

    const { discipline: disciplineDeleted } = await deleteDiscipline.execute({
      disciplineId: discipline.id.toString(),
    });

    expect(disciplinesRepository.disciplines).toHaveLength(0);
    expect(discipline).toEqual(disciplineDeleted);
  });

  it('should not be able to delete a discipline if non existing discipline', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();

    const deleteDiscipline = new DeleteDiscipline(disciplinesRepository);

    expect(() => {
      return deleteDiscipline.execute({
        disciplineId: 'fake discipline id',
      });
    }).rejects.toThrow(DisciplineNotFound);
  });
});
