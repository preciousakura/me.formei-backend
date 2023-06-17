import { makeDiscipline } from '@test/factories/discipline-factory';
import { InMemoryDisciplinesRepository } from '@test/repositories/in-memory-disciplines-repository';
import { UpdateDiscipline } from './update-discipline';

describe('Update discipline', () => {
  it('should be able to update a discipline', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();

    const updateDiscipline = new UpdateDiscipline(disciplinesRepository);
    const discipline = makeDiscipline();
    disciplinesRepository.create(discipline);

    const disciplineRequest = discipline;
    disciplineRequest.name = 'Other Discipline';

    const { discipline: disciplineUpdated } = await updateDiscipline.execute({
      discipline: disciplineRequest,
    });

    expect(disciplinesRepository.disciplines[0]).toEqual(disciplineUpdated);
  });
});
