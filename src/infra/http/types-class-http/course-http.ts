import { ApiProperty } from '@nestjs/swagger';

export class CourseHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
