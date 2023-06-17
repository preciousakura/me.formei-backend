import { ApiProperty } from '@nestjs/swagger';

export abstract class ResponseWithMessage {
  @ApiProperty()
  message: string;
}
