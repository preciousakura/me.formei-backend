import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDisciplineBody {
  @ApiProperty({ example: 'CK0101' })
  @IsNotEmpty()
  cod: string;

  @ApiProperty()
  @IsNotEmpty()
  optional: boolean;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      '1. Gerenciamento de projeto, 2. Estimação de custos, 3. Análise e especificação de requisitos, 4. Especificações formais, 5. Interface com o usuário, 6. Modelagem de dados, 7. Técnicas e modelagens para projeto e implementação: arquitetura de projeto, projeto estruturado, projeto orientado a objetos, 8. Gerenciamento de versões e configurações, 9. Verificação: testes, revisões e inspeções, 10. Validação e certificação de qualidade, 11. Manutenção, 12. Documentação.',
  })
  @IsNotEmpty()
  courseOutline: string;

  @ApiProperty()
  @IsNotEmpty()
  semester: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: ['CK0101', 'CK0201'] })
  @IsNotEmpty()
  prerequisites: string[];

  @ApiProperty({
    example: [
      'SOMMERVILLE, I. Engenharia de Software. 9. ed. São Paulo: Pearson Education, 2011. 568p. ISBN: 9788579361081',
      'PRESSMAN, Roger S. Engenharia de software: uma abordagem profissional. 7. ed. Porto Alegre: McGraw Hill, 2011. 771 p. ISBN: 9788563308337',
      'PÁDUA FILHO, W. Engenharia de Software: Fundamentos, Métodos e Padrões. 3. ed. Rio de Janeiro: LTC, 2009. 1248 p. ISBN 9788521616504.',
    ],
  })
  @IsNotEmpty()
  bibliography: string[];
}
