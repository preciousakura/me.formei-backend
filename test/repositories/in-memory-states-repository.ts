import { State } from '@application/entities/state/state';
import { StatesRepository } from '@application/repositories/states-repository';

export class InMemoryStatesRepository implements StatesRepository {
  public states: State[] = [];

  async findById(stateId: string): Promise<State | null> {
    const state = this.states.find((item) => item.id.toString() === stateId);

    if (!state) {
      return null;
    }

    return state;
  }

  // async findManyByAnyId(AnyId: string): Promise<State[]> {
  //   return this.states.filter((state) => state.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.states.filter((state) => state.AnyId === AnyId).length;
  // }

  async create(state: State) {
    this.states.push(state);
  }

  async save(state: State): Promise<void> {
    const index = this.states.findIndex((item) => item.id === state.id);

    if (index >= 0) {
      this.states[index] = state;
    }
  }
}
