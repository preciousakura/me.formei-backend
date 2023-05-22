import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface UniversityProps {
  name: string;
  abv: string;
  curriculums?: string[] | [];
}

export class University extends Entity<UniversityProps> {
  static create(props: UniversityProps, id?: UniqueEntityID) {
    const university = new University(props, id);
    return university;
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

  // public set curriculums(curriculums: string[]) {
  //   this.props.curriculums = curriculums;
  // }

  public get curriculums() {
    return this.props.curriculums;
  }
}
