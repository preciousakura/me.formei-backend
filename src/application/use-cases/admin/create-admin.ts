import { Admin } from '@application/entities/admin/admin';
import { User, UserProps } from '@application/entities/user/user';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { Injectable } from '@nestjs/common';

interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  lastname: string;
  username: string;
}

interface CreateAdminResponse {
  admin: Admin;
  user: User<UserProps>;
}

@Injectable()
export class CreateAdmin {
  constructor(
    private adminsRepository: AdminsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateAdminRequest): Promise<CreateAdminResponse> {
    const { city, state, lastname, username, email, name, password } = request;

    const user = User.create({
      name,
      email,
      password,
      city,
      lastname,
      username,
      state,
    });

    const admin = Admin.create(
      {
        name,
        lastname,
        username,
        email,
        password,
        city,
        state,
      },
      user.id,
    );

    await this.usersRepository.create(user);
    await this.adminsRepository.create(admin);

    return {
      admin,
      user,
    };
  }
}
