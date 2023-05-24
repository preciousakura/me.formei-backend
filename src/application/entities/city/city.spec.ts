import { makeCity } from '@test/factories/city-factory';

describe('City', () => {
  it('should be able to create a city', () => {
    const city = makeCity();

    expect(city).toBeTruthy();
  });
});
