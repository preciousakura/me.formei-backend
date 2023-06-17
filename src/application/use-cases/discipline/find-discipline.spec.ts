import { makeDiscipline } from '@test/factories/discipline-factory';
import { InMemoryDisciplinesRepository } from '@test/repositories/in-memory-disciplines-repository';
import { FindDiscipline } from './find-discipline';

describe('Find discipline', () => {
  it('should be able to find a discipline', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();

    const findDiscipline = new FindDiscipline(disciplinesRepository);
    const discipline = makeDiscipline();
    disciplinesRepository.create(discipline);

    const { discipline: findedDiscipline } = await findDiscipline.execute({
      disciplineId: discipline.id.toString(),
    });

    expect(disciplinesRepository.disciplines[0]).toEqual(findedDiscipline);
  });
});
