import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface CourseProps {
  name: string;
  curriculums?: string[] | []; //muitos dados?
}

export class Course extends Entity<CourseProps> {
  static create(props: CourseProps, id?: UniqueEntityID) {
    const course = new Course(props, id);
    return course;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  // public set curriculums(curriculums:  Curriculum[]) {
  //   this.props.curriculums = curriculums;
  // }

  public get curriculums() {
    return this.props.curriculums;
  }
}
