import { Injectable } from '@nestjs/common';

import { Admin } from '@application/entities/admin/admin';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { AdminNotFound } from '../errors/admin-not-found';

interface UpdateAdminRequest {
  admin: Admin;
}
interface UpdateAdminResponse {
  admin: Admin;
}

@Injectable()
export class UpdateAdmin {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(request: UpdateAdminRequest): Promise<UpdateAdminResponse> {
    const { admin } = request;

    const adminFinded = await this.adminsRepository.findById(
      admin.adminId.toString(),
    );

    if (!adminFinded) throw new AdminNotFound();

    const adminUpdated = await this.adminsRepository.update(admin);

    return {
      admin: adminUpdated,
    };
  }
}
