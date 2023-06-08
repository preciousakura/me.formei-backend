import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Course } from '../curriculum/course';
import { University } from '../curriculum/university';

export interface DisciplineProps {
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  course: Course;
  university: University;
  prerequisiteDisciplines: string[] | [];
  curriculumId: string;
}

export class Discipline extends Entity<DisciplineProps> {
  static create(props: DisciplineProps, id?: UniqueEntityID) {
    const discipline = new Discipline(props, id);
    return discipline;
  }

  public set course(course: Course) {
    this.props.course = course;
  }

  public get course() {
    return this.props.course;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description() {
    return this.props.description;
  }

  public set university(university: University) {
    this.props.university = university;
  }

  public get university() {
    return this.props.university;
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

  public get prerequisiteDisciplines() {
    return this.props.prerequisiteDisciplines;
  }

  public set curriculumId(curriculumId: string) {
    this.props.curriculumId = curriculumId;
  }

  public get curriculumId() {
    return this.props.curriculumId;
  }
}
