import { User } from '@application/entities/user/user';
import { CitiesRepository } from '@application/repositories/cities-repository';
import { StatesRepository } from '@application/repositories/states-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { CityNotFound } from '../errors/city-not-found';
import { StateNotFound } from '../errors/state-not-found';

import { Admin } from '@application/entities/admin/admin';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { CreateAdminBody } from '@infra/http/dto/admin/create-admin.dto';
import { Injectable } from '@nestjs/common';
import { UserAlreadyExists } from '../errors/user-already-exists';
import { EncriptionPassword } from './encription-password';

@Injectable()
export class RegisterAccountAdmin {
  constructor(
    private adminsRepository: AdminsRepository,
    private usersRepository: UsersRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
    private encriptionPassword: EncriptionPassword,
  ) {}

  async execute(request: CreateAdminBody) {
    const { lastname, username, email, name, password, cityId } = request;

    const adminAlreadyExists =
      await this.adminsRepository.findByEmailOrUserName({
        email: email,
        username: username,
      });

    if (adminAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw new CityNotFound();
    }

    const state = await this.statesRepository.findById(city.state.id.toValue());

    if (!state) {
      throw new StateNotFound();
    }

    const hashedPassword = await this.encriptionPassword.execute({ password });

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      city,
      lastname,
      username,
      state: state.name,
    });

    const admin = Admin.create(
      {
        name,
        email,
        password: hashedPassword,
        city,
        lastname,
        state: state.name,
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
