import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface UniversityProps {
  name: string;
  abv: string;
  city: string;
  state: string;
  curriculums?: string[] | [];
}

export class University extends Entity<UniversityProps> {
  static create(props: UniversityProps, id?: UniqueEntityID) {
    const university = new University(props, id);
    return university;
  }

  public get _props() {
    return this.props;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  public set abv(abv: string) {
    this.props.abv = abv;
  }

  public get abv() {
    return this.props.abv;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get city() {
    return this.props.city;
  }

  public set state(state: string) {
    this.props.state = state;
  }

  public get state() {
    return this.props.state;
  }

  // public set curriculums(curriculums: string[]) {
  //   this.props.curriculums = curriculums;
  // }

  public get curriculums() {
    return this.props.curriculums;
  }
}
