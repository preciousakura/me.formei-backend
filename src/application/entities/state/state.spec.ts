import { State } from './state';

describe('State', () => {
  it('should be able to create a state', () => {
    const state = State.create({
      name: 'example state name',
    });

    expect(state).toBeTruthy();
  });
});
