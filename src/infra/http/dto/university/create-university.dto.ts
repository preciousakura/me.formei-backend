import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUniversityBody {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  abv: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;
}
