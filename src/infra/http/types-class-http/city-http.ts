import { ApiProperty } from '@nestjs/swagger';
import { StateHttp } from './state-http';

export class CityHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  state: StateHttp;
}
