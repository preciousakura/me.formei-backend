import { State, StateProps } from '@application/entities/state/state';

type Override = Partial<StateProps>;

export function makeState(override: Override = {}) {
  return State.create({
    name: 'example name state',
    ...override,
  });
}
