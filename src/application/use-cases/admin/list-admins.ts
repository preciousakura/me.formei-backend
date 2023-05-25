import { Injectable } from '@nestjs/common';

import { Admin } from '@application/entities/admin/admin';
import { AdminsRepository } from '@application/repositories/admins-repository';

interface ListAdminsResponse {
  admins: Admin[];
}

@Injectable()
export class ListAdmins {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(): Promise<ListAdminsResponse> {
    const admins = await this.adminsRepository.list();

    return {
      admins,
    };
  }
}
