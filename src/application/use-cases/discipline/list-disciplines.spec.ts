import { makeDiscipline } from '@test/factories/discipline-factory';
import { InMemoryDisciplinesRepository } from '@test/repositories/in-memory-disciplines-repository';
import { ListDisciplines } from './list-disciplines';

describe('List disciplines', () => {
  it('should be able to list a disciplines', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();

    const listDisciplines = new ListDisciplines(disciplinesRepository);
    const discipline1 = makeDiscipline();
    const discipline2 = makeDiscipline();
    const discipline3 = makeDiscipline();
    disciplinesRepository.create(discipline1);
    disciplinesRepository.create(discipline2);
    disciplinesRepository.create(discipline3);
    const { disciplines } = await listDisciplines.execute();

    expect(disciplinesRepository.disciplines).toEqual(disciplines);
    expect(disciplinesRepository.disciplines[0]).toEqual(discipline1);
    expect(disciplinesRepository.disciplines[1]).toEqual(discipline2);
    expect(disciplinesRepository.disciplines[2]).toEqual(discipline3);
  });
});
