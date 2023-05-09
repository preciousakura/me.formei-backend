export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id;
    this.props = props;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  public get id() {
    return this._id;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email() {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password() {
    return this.props.password;
  }
}
