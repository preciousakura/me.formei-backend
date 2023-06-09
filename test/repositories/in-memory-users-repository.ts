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

  async list(): Promise<User<UserProps>[] | []> {
    return this.users;
  }

  async delete(userId: string): Promise<void> {
    const usersIndex = this.users.findIndex(
      (item) => item.id.toString() === userId,
    );

    if (usersIndex >= 0) {
      this.users.splice(usersIndex, 1);
    }
  }

  async findByUsername(username: string): Promise<User<UserProps> | null> {
    const student = this.users.find((item) => item.username == username);
    if (!student) {
      return null;
    }

    return student;
  }
}
