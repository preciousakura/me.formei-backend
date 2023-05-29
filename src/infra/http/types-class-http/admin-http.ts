import { ApiProperty } from '@nestjs/swagger';
import { CityHttp } from './city-http';

export class AdminHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  adminId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  city: CityHttp;
}
