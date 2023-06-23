import { CourseHistoryViewModel } from '@infra/http/view-models/course-history-view-model';
import { makeCourseHistory } from '@test/factories/course-history';

describe('CourseHistory by status', () => {
  it('should be able to find courseshistories ', () => {
    const c1 = makeCourseHistory(
      { semester: 7 },
      { name: 'Logica para computação' },
    );
    const c2 = makeCourseHistory(
      { semester: 4 },
      { name: 'Engenharia de software' },
    );
    const c3 = makeCourseHistory({ semester: 6 }, { name: 'Compiladores' });

    const coursesHistories = [c1, c2, c3];

    const result = CourseHistoryViewModel.toFront(coursesHistories);

    expect(result).toBeTruthy();
  });
});
