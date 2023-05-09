import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { User, UserProps } from '../user/user';

export interface AdminProps {
  adminId?: string;
}

export class Admin extends User {
  private _props: AdminProps;
  constructor(
    userProps: UserProps,
    props?: Replace<AdminProps, { adminId?: string }>,
    id?: string,
  ) {
    super(userProps, id ?? randomUUID());
    this._props = {
      ...props,
      adminId: props?.adminId ?? randomUUID(),
    };
  }

  public set adminId(adminId: string) {
    this._props.adminId = adminId;
  }

  public get adminId() {
    return this._props.adminId;
  }
}
