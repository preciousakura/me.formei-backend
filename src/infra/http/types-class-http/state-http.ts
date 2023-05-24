import { ApiProperty } from '@nestjs/swagger';

export class StateHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
