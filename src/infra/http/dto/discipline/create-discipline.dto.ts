import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDisciplineBody {
  @ApiProperty()
  @IsNotEmpty()
  cod: string;

  @ApiProperty()
  @IsNotEmpty()
  optional: boolean;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
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
  prerequisiteDisciplines: string[];
}
