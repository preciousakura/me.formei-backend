import { makeExtraCurricularActivity } from '@test/factories/extracurricular-activity-factory';
import { InMemoryExtraCurricularRepository } from '@test/repositories/in-memory-extracurricular-repository';
import { FindExtraCurricularActivity } from './find-extracurricular-activity';

describe('Find exc activity', () => {
  it('should be able to find a exc activity', async () => {
    const extracurricularRepository = new InMemoryExtraCurricularRepository();

    const findExc = new FindExtraCurricularActivity(extracurricularRepository);
    const exc = makeExtraCurricularActivity();
    extracurricularRepository.create(exc);

    const { extraCurricularActivity } = await findExc.execute({
      id: exc.id.toValue(),
    });

    expect(extracurricularRepository.extraCurricularActivities[0]).toEqual(
      extraCurricularActivity,
    );
  });
});
