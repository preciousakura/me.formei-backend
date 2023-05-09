import { User } from 'src/application/entities/user/user';
import { UsersRepository } from 'src/application/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === userId);

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

  async create(user: User) {
    this.users.push(user);
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
