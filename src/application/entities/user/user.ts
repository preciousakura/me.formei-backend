import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export interface UserProps {
  name: string;
  email: string;
  password: string;
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
