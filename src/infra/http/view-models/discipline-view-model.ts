import { Discipline } from '@application/entities/discipline/discipline';
import { ApiProperty } from '@nestjs/swagger';

export class DisciplineViewModel {
  @ApiProperty()
  static toHTTP(discipline: Discipline) {
    const {
      cod,
      courseOutline,
      curriculumId,
      description,
      id,
      name,
      optional,
      semester,
      prerequisiteDisciplines,
    } = discipline;

    return {
      id: id.toValue(),
      name,
      cod,
      menu: courseOutline,
      curriculumId,
      description,
      isOptional: optional,
      semester,
      prerequisites: prerequisiteDisciplines,
    };
  }

  static toFront(disciplinesIn: Discipline[]) {
    const periods = findFirstOccurrencesDisc(disciplinesIn);

    const output: ToFront[] = [];

    periods.forEach((period: number) => {
      let disciplines: DisciplineViewToFront[] = [];
      const obj: ToFront = {
        period: null,
        disciplines: null,
      };

      const disciplinesInByPeriod = disciplinesIn.filter(
        (discipline) => discipline.semester === period,
      );
      obj['period'] = period;
      const disciplinesByPeriod: DisciplineViewToFront[] =
        disciplinesInByPeriod.map((ch) => {
          const disc = DisciplineViewModel.toHTTP(ch);
          delete disc.semester;
          const discipline: DisciplineViewToFront = { ...disc };

          return discipline;
        });
      disciplines = disciplinesByPeriod;
      obj['disciplines'] = disciplines;
      output.push(obj);
    });

    return output;
  }
}

export function findFirstOccurrencesDisc(objects: Discipline[]): number[] {
  const uniqueValues: number[] = [];
  const firstOccurrences: number[] = [];

  for (const obj of objects) {
    if (!uniqueValues.includes(obj.semester)) {
      uniqueValues.push(obj.semester);
      firstOccurrences.push(obj.semester);
    }
  }

  return firstOccurrences;
}

type DisciplineViewToFront = {
  id: string;
  name: string;
  cod: string;
  menu: string;
  curriculumId: string;
  description: string;
  isOptional: boolean;
  prerequisites: string[] | [];
};

type ToFront = {
  period: number;
  disciplines: DisciplineViewToFront[];
};
