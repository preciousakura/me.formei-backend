import { Injectable } from '@nestjs/common';

import { Admin } from '@application/entities/admin/admin';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { UpdateAdminBody } from '@infra/http/dto/admin/update-admin.dto';
import { AdminNotFound } from '../errors/admin-not-found';

interface UpdateAdminRequest {
  id: string;
  admin: UpdateAdminBody;
}

interface UpdateAdminResponse {
  admin: Admin;
}

@Injectable()
export class UpdateAdmin {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(request: UpdateAdminRequest): Promise<UpdateAdminResponse> {
    const { admin, id } = request;

    const adminFinded = await this.adminsRepository.findById(id);

    if (!adminFinded) throw new AdminNotFound();

    const data = Admin.create(
      { ...adminFinded._props, ...admin },
      adminFinded.id,
    );

    const adminUpdated = await this.adminsRepository.update(data);

    return {
      admin: adminUpdated,
    };
  }
}
