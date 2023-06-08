import { makeExtraCurricularActivity } from '@test/factories/extracurricular-activity-factory';
import { InMemoryExtraCurricularRepository } from '@test/repositories/in-memory-extracurricular-repository';
import { ExtraCurricularActivityNotFound } from '../errors/extracurricular-activity-not-found';
import { DeleteExtraCurricular } from './delete-extracurricular-activity';

describe('Delete ExtraCurricular Activity', () => {
  it('should be able to delete a ExtraCurricular Activity', async () => {
    const extracurricularRepository = new InMemoryExtraCurricularRepository();

    const extraCurricular = makeExtraCurricularActivity();
    extracurricularRepository.create(extraCurricular);

    const deleteExtraCurricularActivity = new DeleteExtraCurricular(
      extracurricularRepository,
    );

    const { extraCurricular: extraCurricularDeleted } =
      await deleteExtraCurricularActivity.execute({
        id: extraCurricular.id.toValue(),
      });

    expect(extracurricularRepository.extraCurricularActivities).toHaveLength(0);
    expect(extraCurricularDeleted).toEqual(extraCurricular);
  });

  it('should not be able to delete a ExtraCurricular Activity if non existing ExtraCurricular Activity', async () => {
    const extracurricularRepository = new InMemoryExtraCurricularRepository();

    const deleteExtraCurricularActivity = new DeleteExtraCurricular(
      extracurricularRepository,
    );

    expect(() => {
      return deleteExtraCurricularActivity.execute({
        id: 'fake exc id',
      });
    }).rejects.toThrow(ExtraCurricularActivityNotFound);
  });
});
