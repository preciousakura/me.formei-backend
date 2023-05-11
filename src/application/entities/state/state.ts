import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface StateProps {
  name: string;
}

export class State extends Entity<StateProps> {
  static create(props: StateProps, id?: UniqueEntityID) {
    const state = new State(props, id);
    return state;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }
}
