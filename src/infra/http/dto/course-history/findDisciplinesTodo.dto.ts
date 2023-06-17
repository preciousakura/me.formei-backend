import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindDisciplinesTodoBody {
  @ApiProperty()
  @IsNotEmpty()
  curriculumId: string;
}
