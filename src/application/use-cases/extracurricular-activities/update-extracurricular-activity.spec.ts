import { makeExtraCurricularActivity } from '@test/factories/extracurricular-activity-factory';
import { InMemoryExtraCurricularRepository } from '@test/repositories/in-memory-extracurricular-repository';
import { UpdateExtraCurricularActivity } from './update-extracurricular-activity';

describe('Update exc activity', () => {
  it('should be able to update a exc activity', async () => {
    const extraCurricularRepository = new InMemoryExtraCurricularRepository();

    const updateExtraCurricularActivity = new UpdateExtraCurricularActivity(
      extraCurricularRepository,
    );
    const extraCurricularActivity = makeExtraCurricularActivity();
    extraCurricularRepository.create(extraCurricularActivity);

    const extraCurricularActivityRequest = extraCurricularActivity;
    extraCurricularActivityRequest.title = 'estagio no insight great lsbd';
    extraCurricularActivityRequest.hours = 40;

    const { extraCurricularActivity: extraCurricularActivityUpdated } =
      await updateExtraCurricularActivity.execute({
        extraCurricularActivity: extraCurricularActivityRequest,
      });

    expect(extraCurricularRepository.extraCurricularActivities[0]).toEqual(
      extraCurricularActivityUpdated,
    );
  });
});
