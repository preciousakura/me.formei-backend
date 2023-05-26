import { City } from '@application/entities/city/city';
import { ApiProperty } from '@nestjs/swagger';
import { StateViewModel } from './state-view-model';

export class CityViewModel {
  @ApiProperty()
  static toHTTP(city: City) {
    const { id, name, state } = city;

    return {
      id: id.toValue(),
      name,
      state: StateViewModel.toHTTP(state),
    };
  }
}
