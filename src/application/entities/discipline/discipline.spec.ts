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
      prerequisiteDisciplines: [],
      bibliography: [],
    });

    expect(discipline).toBeTruthy();
  });
});
