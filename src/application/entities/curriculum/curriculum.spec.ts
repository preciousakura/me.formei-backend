import { Discipline } from '../discipline/discipline';
import { Course } from './course';
import { Curriculum } from './curriculum';
import { University } from './university';

describe('Curriculum', () => {
  it('should be able to create a curriculum', () => {
    const course = Course.create({
      name: 'Example name',
    });
    const university = University.create({
      name: 'Example name',
      abv: 'Example name',
    });
    const curriculum = Curriculum.create({
      course: course,
      description: 'Example description',
      university: university,
      disciplines: [
        Discipline.create({
          cod: 'CK220',
          course: course,
          courseOutline: 'Example courseoutline',
          description: 'Example description',
          hours: 64,
          name: 'Example name',
          optional: false,
          prerequisiteDisciplines: [],
          university: university,
        }),
        Discipline.create({
          cod: 'Example cod',
          course: course,
          courseOutline: 'Example courseoutline',
          description: 'Example description',
          hours: 64,
          name: 'Example name',
          optional: false,
          prerequisiteDisciplines: [],
          university: university,
        }),
      ],
      extraCurricularHours: 192,
      optionalHours: 1200,
      requiredHours: 3200,
    });

    expect(curriculum).toBeTruthy();
  });
});
