import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface CityProps {
  name: string;
  stateId: string;
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

  public set stateId(stateId: string) {
    this.props.stateId = stateId;
  }

  public get stateId() {
    return this.props.stateId;
  }
}
