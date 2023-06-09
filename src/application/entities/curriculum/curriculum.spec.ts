import { makeUniversity } from '@test/factories/university-factory';
import { Course } from './course';
import { Curriculum } from './curriculum';

describe('Curriculum', () => {
  it('should be able to create a curriculum', () => {
    const course = Course.create({
      name: 'Example name',
    });
    const university = makeUniversity();
    const curriculum = Curriculum.create({
      course: course,
      description: 'Example description',
      university: university,
      extraCurricularHours: 192,
      optionalHours: 1200,
      requiredHours: 3200,
    });

    expect(curriculum).toBeTruthy();
  });
});
