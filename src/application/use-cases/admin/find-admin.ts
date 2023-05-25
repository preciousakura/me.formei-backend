import { Injectable } from '@nestjs/common';

import { Admin } from '@application/entities/admin/admin';
import { AdminsRepository } from '@application/repositories/admins-repository';
import { AdminNotFound } from '../errors/admin-not-found';

interface FindAdminRequest {
  adminId: string;
}
interface FindAdminResponse {
  admin: Admin;
}

@Injectable()
export class FindAdmin {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(request: FindAdminRequest): Promise<FindAdminResponse> {
    const { adminId } = request;
    const admin = await this.adminsRepository.findById(adminId);

    if (!admin) throw new AdminNotFound();

    return {
      admin,
    };
  }
}
