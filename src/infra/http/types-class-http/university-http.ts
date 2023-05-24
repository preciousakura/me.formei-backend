import { ApiProperty } from '@nestjs/swagger';

export class UniversityHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: 'UFC' })
  abv: string;
}
