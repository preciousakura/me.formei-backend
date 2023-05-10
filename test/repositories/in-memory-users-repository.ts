import { User, UserProps } from 'src/application/entities/user/user';
import { UsersRepository } from 'src/application/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User<UserProps>[] = [];

  async findById(userId: string): Promise<User<UserProps> | null> {
    const user = this.users.find((item) => item.id.toString() === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  // async findManyByAnyId(AnyId: string): Promise<User[]> {
  //   return this.users.filter((user) => user.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.users.filter((user) => user.AnyId === AnyId).length;
  // }

  async create(user: User<UserProps>) {
    this.users.push(user);
  }

  async save(user: User<UserProps>): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
