import { CourseHistory } from '@application/entities/course-history/course-history';
import { ApiProperty } from '@nestjs/swagger';
import { DisciplineViewModel } from './discipline-view-model';

export class CourseHistoryViewModel {
  @ApiProperty()
  static toHTTP(courseHistory: CourseHistory) {
    const {
      id,
      createdAt,
      daysWeek,
      discipline,
      endTime,
      hours,
      semester,
      startTime,
      status,
      studentRegistration,
    } = courseHistory;

    return {
      id: id.toValue(),
      createdAt,
      daysWeek,
      discipline: DisciplineViewModel.toHTTP(discipline),
      endTime,
      hours,
      semester,
      startTime,
      status,
      studentRegistration,
    };
  }

  @ApiProperty()
  static toFront(courseHistories: CourseHistory[]) {
    const periods = findFirstOccurrences(courseHistories);

    const output: ToFront[] = [];

    periods.forEach((period: number) => {
      let disciplines: DisciplineToFront[] = [];
      const obj: ToFront = {
        period: null,
        disciplines: null,
      };

      const courseHistoriesByPeriod = courseHistories.filter(
        (ch) => ch.semester === period,
      );
      obj['period'] = period;
      const disciplinesByPeriod: DisciplineToFront[] =
        courseHistoriesByPeriod.map((ch) => {
          const disc = DisciplineViewModel.toHTTP(ch.discipline);
          delete disc.semester;
          const discipline: DisciplineToFront = { ...disc, workload: ch.hours };

          return discipline;
        });
      disciplines = disciplinesByPeriod;
      obj['disciplines'] = disciplines;
      output.push(obj);
    });

    return output;

    //     {
    //       period: "PERÍODO ATUAL",
    //       disciplines: [
    //         {
    //           name: "Engenharia de Software",
    //           prerequisites: [
    //             {
    //               name: "Programação",
    //               prerequisites: [
    //                 {
    //                   name: "Fundamentos de Programação",
    //                   prerequisites: [],
    //                   workload: 64,
    //                   cod: "CB0534",
    //                   isOptional: false,

    //                   bibliography: [],
    //                 },
    //               ],
    //               workload: 64,
    //               cod: "CB0534",
    //               isOptional: false,

    //               bibliography: [],
    //             },
    //           ],
    //           workload: 64,
    //           cod: "CB0534",
    //           isOptional: false,
    //           menu: "1. Gerenciamento de projeto, 2. Estimação de custos, 3. Análise e especificação de requisitos, 4. Especificações formais, 5. Interface com o usuário, 6. Modelagem de dados, 7. Técnicas e modelagens para projeto e implementação: arquitetura de projeto, projeto estruturado, projeto orientado a objetos, 8. Gerenciamento de versões e configurações, 9. Verificação: testes, revisões e inspeções, 10. Validação e certificação de qualidade, 11. Manutenção, 12. Documentação.",
    //           bibliography: [
    //             "SOMMERVILLE, I. Engenharia de Software. 9. ed. São Paulo: Pearson Education, 2011. 568p. ISBN: 9788579361081",
    //             "PRESSMAN, Roger S. Engenharia de software: uma abordagem profissional. 7. ed. Porto Alegre: McGraw Hill, 2011. 771 p. ISBN: 9788563308337",
    //             "PÁDUA FILHO, W. Engenharia de Software: Fundamentos, Métodos e Padrões. 3. ed. Rio de Janeiro: LTC, 2009. 1248 p. ISBN 9788521616504.",
    //           ],
    //         },
    //         {
    //           name: "Lógica para ciência da Computação",
    //           prerequisites: [],
    //           workload: 96,
    //           cod: "CB0534",
    //           isOptional: false,
    //           bibliography: [],
    //         },
    //         {
    //           name: "Computação Gráfica II",
    //           prerequisites: [],
    //           workload: 64,
    //           cod: "CB0534",
    //           isOptional: true,
    //           bibliography: [],
    //         },
    //         {
    //           name: "Aprendizagem de Máquina",
    //           prerequisites: [],
    //           workload: 64,
    //           cod: "CB0534",
    //           isOptional: true,
    //           bibliography: [],
    //         },
    //       ],
    //     },
  }
}

export function findFirstOccurrences(objects: CourseHistory[]): number[] {
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

export type DisciplineToFront = {
  id: string;
  name: string;
  cod: string;
  menu: string;
  curriculumId: string;
  description: string;
  isOptional: boolean;
  prerequisites: string[] | [];
  workload: number;
};

export type ToFront = {
  period: number;
  disciplines: DisciplineToFront[];
};
