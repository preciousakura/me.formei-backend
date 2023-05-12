import { City } from '@application/entities/city/city';

export abstract class CitiesRepository {
  abstract create(city: City): Promise<void>;
  abstract findById(cityId: string): Promise<City | null>;
  abstract save(city: City): Promise<void>;
  // abstract countManyByAnyId(anyId: string): Promise<number>;
  // abstract findManyByAnyId(anyId: string): Promise<Admin[]>;
}
