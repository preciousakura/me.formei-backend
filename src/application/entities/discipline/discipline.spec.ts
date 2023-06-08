import { makeCourse } from '@test/factories/course-factory';
import { makeUniversity } from '@test/factories/university-factory';
import { Discipline } from './discipline';

describe('Discipline', () => {
  it('should be able to create a discipline', () => {
    const discipline = Discipline.create({
      cod: 'example code',
      optional: false,
      name: 'Example name',
      courseOutline: 'xxx',
      semester: 1,
      description: 'Example description',
      curriculumId: 'example-curriculum-id',
      course: makeCourse(),
      university: makeUniversity(),
      prerequisiteDisciplines: [],
    });

    expect(discipline).toBeTruthy();
  });
});
