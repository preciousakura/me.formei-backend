import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCourseBody {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
