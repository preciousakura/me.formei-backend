import { Admin } from '@application/entities/admin/admin';
import { User } from '@application/entities/user/user';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { CreateAdminBody } from '@infra/http/dto/admin/create-admin.dto';
import { Injectable } from '@nestjs/common';
import { UserAlreadyExists } from '../errors/user-already-exists';
import { EncriptionPassword } from './encription-password';

@Injectable()
export class RegisterAccountAdmin {
  constructor(
    private adminsRepository: AdminsRepository,
    private usersRepository: UsersRepository,
    private encriptionPassword: EncriptionPassword,
  ) {}

  async execute(request: CreateAdminBody) {
    const { lastname, username, email, name, password, city, state } = request;

    const adminAlreadyExists =
      await this.adminsRepository.findByEmailOrUserName({
        email: email,
        username: username,
      });

    if (adminAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await this.encriptionPassword.execute({ password });

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      city,
      lastname,
      username,
      state: state,
    });

    const admin = Admin.create(
      {
        name,
        email,
        password: hashedPassword,
        city,
        lastname,
        state: state,
        username,
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
