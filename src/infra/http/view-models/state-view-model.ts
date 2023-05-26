import { State } from '@application/entities/state/state';
import { ApiProperty } from '@nestjs/swagger';

export class StateViewModel {
  @ApiProperty()
  static toHTTP(state: State) {
    const { id, name } = state;

    return {
      id: id.toValue(),
      name,
    };
  }
}
