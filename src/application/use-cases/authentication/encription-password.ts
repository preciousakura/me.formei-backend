import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface EncriptionPasswordResquest {
  password: string;
}

@Injectable()
export class EncriptionPassword {
  async execute(request: EncriptionPasswordResquest) {
    const hashedPassword = await bcrypt.hash(request.password, 8);

    return hashedPassword;
  }
}
