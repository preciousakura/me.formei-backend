import { User, UserProps } from '../entities/user/user';

export abstract class UsersRepository {
  abstract create(user: User<UserProps>): Promise<void>;
  abstract findById(userId: string): Promise<User<UserProps> | null>;
  abstract save(user: User<UserProps>): Promise<void>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
