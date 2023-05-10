import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { User, UserProps } from '../user/user';

export interface AdminProps extends UserProps {
  adminId?: UniqueEntityID;
}

export class Admin extends User<AdminProps> {
  static create(props: AdminProps, id?: UniqueEntityID) {
    const admin = new Admin(props, id);
    return admin;
  }

  public set adminId(adminId: UniqueEntityID) {
    this.props.adminId = adminId;
  }

  public get adminId() {
    return this.props.adminId;
  }
}
