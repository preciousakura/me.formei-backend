import { Injectable } from '@nestjs/common';

import { Admin } from '@application/entities/admin/admin';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { AdminNotFound } from '../errors/admin-not-found';

interface DeleteAdminResponse {
  admin: Admin;
}
interface DeleteAdminRequest {
  adminId: string;
}

@Injectable()
export class DeleteAdmin {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(request: DeleteAdminRequest): Promise<DeleteAdminResponse> {
    const admin = await this.adminsRepository.findById(request.adminId);

    if (!admin) {
      throw new AdminNotFound();
    }

    await this.adminsRepository.delete(admin.adminId.toString());

    return {
      admin,
    };
  }
}
