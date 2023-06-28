import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
export interface DisciplineProps {
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  prerequisiteDisciplines: string[];
  bibliography: string[];
  curriculumId: string;
}

export class Discipline extends Entity<DisciplineProps> {
  static create(props: DisciplineProps, id?: UniqueEntityID) {
    const discipline = new Discipline(props, id);
    return discipline;
  }

  public get _props() {
    return this.props;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description() {
    return this.props.description;
  }

  public set cod(cod: string) {
    this.props.cod = cod;
  }

  public get cod() {
    return this.props.cod;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  public set optional(optional: boolean) {
    this.props.optional = optional;
  }

  public get optional() {
    return this.props.optional;
  }

  public set semester(semester: number) {
    this.props.semester = semester;
  }

  public get semester() {
    return this.props.semester;
  }

  public set courseOutline(courseOutline: string) {
    this.props.courseOutline = courseOutline;
  }

  public get courseOutline() {
    return this.props.courseOutline;
  }

  public set bibliography(bibliography: string[]) {
    this.props.bibliography = bibliography;
  }

  public get bibliography() {
    return this.props.bibliography;
  }

  public get prerequisiteDisciplines() {
    return this.props.prerequisiteDisciplines;
  }

  public set curriculumId(curriculumId: string) {
    this.props.curriculumId = curriculumId;
  }

  public get curriculumId() {
    return this.props.curriculumId;
  }

  public addOneBibliography(bibliography: string) {
    if (!this.bibliography.includes(bibliography)) {
      this.props.bibliography.push(bibliography);
    }
  }

  public removeOneBibliography(bibliography: string) {
    const index = this.props.bibliography.findIndex(
      (bibliograph) => bibliograph === bibliography,
    );

    this.props.bibliography = this.props.bibliography.filter(
      (bh, i) => i != index,
    );
  }
}
