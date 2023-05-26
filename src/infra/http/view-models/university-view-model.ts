import { University } from '@application/entities/curriculum/university';
import { ApiProperty } from '@nestjs/swagger';

export class UniversityViewModel {
  @ApiProperty()
  static toHTTP(university: University) {
    const { id, name, abv } = university;

    return {
      id: id.toValue(),
      name,
      abv,
    };
  }
}
