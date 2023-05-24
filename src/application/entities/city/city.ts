import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { State } from '../state/state';

export interface CityProps {
  name: string;
  state: State;
}

export class City extends Entity<CityProps> {
  static create(props: CityProps, id?: UniqueEntityID) {
    const city = new City(props, id);
    return city;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  public set state(state: State) {
    this.props.state = state;
  }

  public get state() {
    return this.props.state;
  }
}
