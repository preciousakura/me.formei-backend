import { Injectable } from '@nestjs/common';
import { Admin } from '@application/entities/admin/admin';
import { User, UserProps } from '@application/entities/user/user';
import { CitiesRepository } from '@application/repositories/cities-repository';
import { StatesRepository } from '@application/repositories/states-repository';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { UsersRepository } from '@application/repositories/users-repository';
import { CityNotFound } from '../errors/city-not-found';
import { StateNotFound } from '../errors/state-not-found';

interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
  cityId: string;
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
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
  ) {}

  async execute(request: CreateAdminRequest): Promise<CreateAdminResponse> {
    const {
      cityId,
      lastname,
      username,
      email,
      name,
      password,
    } = request;

    if (!city) {
      throw new CityNotFound();
    }

    const state = await this.statesRepository.findById(city.stateId);

    if (!state) {
      throw new StateNotFound();
    }

    const user = User.create({
      name,
      email,
      password,
      city,
      lastname,
      username,
      state: state.name,
    });

    const admin = Admin.create(
      {
        name,
        lastname,
        username,
        email,
        password,
        city,
        state: state.name,
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
