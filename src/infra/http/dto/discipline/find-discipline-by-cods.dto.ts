import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindDisciplineByCodsBody {
  @ApiProperty({ example: ['CK0101', 'CK0222'] })
  @IsNotEmpty()
  cods: string[];
}
