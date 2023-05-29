import { Admin } from '@application/entities/admin/admin';
import { ApiProperty } from '@nestjs/swagger';
import { CityViewModel } from './city-view-model';

export class AdminViewModel {
  @ApiProperty()
  static toHTTP(admin: Admin) {
    const { email, id, name, city, lastname, username, adminId } = admin;

    return {
      id: id.toValue(),
      name,
      email,
      lastname,
      adminId: adminId.toValue(),
      username,
      city: CityViewModel.toHTTP(city),
    };
  }
}
