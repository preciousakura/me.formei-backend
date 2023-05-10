import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { User, UserProps } from '../user/user';

export interface StudentProps extends UserProps {
  registration: string;
  curriculumId: string;
}

export class Student extends User<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id);
    return student;
  }

  public set registration(registration: string) {
    this.props.registration = registration;
  }

  public get registration() {
    return this.props.registration;
  }

  public set curriculumId(curriculumId: string) {
    this.props.curriculumId = curriculumId;
  }

  public get curriculumId() {
    return this.props.curriculumId;
  }
}
