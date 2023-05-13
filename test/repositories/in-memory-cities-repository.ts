import { City } from '@application/entities/city/city';
import { CitiesRepository } from 'src/application/repositories/cities-repository';

export class InMemoryCitiesRepository implements CitiesRepository {
  public cities: City[] = [];

  async findById(cityId: string): Promise<City | null> {
    const city = this.cities.find((item) => item.id.toString() === cityId);

    if (!city) {
      return null;
    }

    return city;
  }

  // async findManyByAnyId(AnyId: string): Promise<City[]> {
  //   return this.cities.filter((city) => city.AnyId === AnyId);
  // }

  // async countManyByAnyId(AnyId: string): Promise<number> {
  //   return this.cities.filter((city) => city.AnyId === AnyId).length;
  // }

  async create(city: City) {
    this.cities.push(city);
  }

  async save(city: City): Promise<void> {
    const index = this.cities.findIndex((item) => item.id === city.id);

    if (index >= 0) {
      this.cities[index] = city;
    }
  }

  async list(): Promise<City[] | []> {
    return this.cities;
  }

  async delete(cityId: string): Promise<void> {
    const citiesIndex = this.cities.findIndex(
      (item) => item.id.toString() === cityId,
    );

    if (citiesIndex >= 0) {
      this.cities.splice(citiesIndex, 1);
    }
  }
}
