import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export interface UserProps {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  state: string;
  city: string;
}

export class User<Props extends UserProps> extends Entity<Props> {
  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);
    return user;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name() {
    return this.props.name;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get city() {
    return this.props.city;
  }

  public set lastname(lastname: string) {
    this.props.lastname = lastname;
  }

  public get lastname() {
    return this.props.lastname;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get username() {
    return this.props.username;
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

  public set state(state: string) {
    this.props.state = state;
  }

  public get state() {
    return this.props.state;
  }
}
