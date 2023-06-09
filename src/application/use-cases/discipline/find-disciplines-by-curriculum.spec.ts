import { makeCurriculum } from '@test/factories/curriculum-factory';
import { makeDiscipline } from '@test/factories/discipline-factory';
import { InMemoryDisciplinesRepository } from '@test/repositories/in-memory-disciplines-repository';
import { FindDisciplinesByCurriculum } from './find-disciplines-by-curriculum';

describe('Find disciplines by curriculum', () => {
  it('should be able to find disciplines', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();

    const findDisciplines = new FindDisciplinesByCurriculum(
      disciplinesRepository,
    );

    const curriculum = makeCurriculum();
    const discipline = makeDiscipline({
      curriculumId: curriculum.id.toString(),
    });
    disciplinesRepository.create(discipline);

    const { disciplines: findedDisciplines } = await findDisciplines.execute({
      curriculumId: curriculum.id.toString(),
    });

    expect(disciplinesRepository.disciplines).toEqual(findedDisciplines);
    expect(disciplinesRepository.disciplines[0]).toEqual(discipline);
  });
});
