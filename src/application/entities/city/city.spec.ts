import { City } from './city';

describe('City', () => {
  it('should be able to create a city', () => {
    const city = City.create({
      name: 'Example name',
      stateId: 'example-state-id',
    });

    expect(city).toBeTruthy();
  });
});
