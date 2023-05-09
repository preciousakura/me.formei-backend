import { randomUUID } from 'crypto';
import { User, UserProps } from '../user/user';

export interface StudentProps {
  registration: string;
  curriculumId: string;
}

export class Student extends User {
  private _props: StudentProps;

  constructor(userProps: UserProps, props: StudentProps, id?: string) {
    super(userProps, id ?? randomUUID());
    this._props = props;
  }

  public set registration(registration: string) {
    this._props.registration = registration;
  }

  public get registration() {
    return this._props.registration;
  }

  public set curriculumId(curriculumId: string) {
    this._props.curriculumId = curriculumId;
  }

  public get curriculumId() {
    return this._props.curriculumId;
  }
}
