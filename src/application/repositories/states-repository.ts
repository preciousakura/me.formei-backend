import { State } from '@application/entities/state/state';

export abstract class StatesRepository {
  abstract create(state: State): Promise<void>;
  abstract findById(stateId: string): Promise<State | null>;
  abstract save(state: State): Promise<void>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
