import { Login } from '@application/use-cases/authentication/login';
import { RegisterAccountAdmin } from '@application/use-cases/authentication/register-admin';
import { RegisterAccountStudent } from '@application/use-cases/authentication/register-student';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginBody } from '../dto/auth/login.dto';
import { AdminHttp } from '../types-class-http/admin-http';
import { StudentHttp } from '../types-class-http/student-http';
import { AdminViewModel } from '../view-models/admin-view-model';
import { StudentViewModel } from '../view-models/student-view-model';

export class ResponseLoginStudent {
  @ApiProperty()
  message: string;
  @ApiProperty()
  user: StudentHttp;

  @ApiProperty()
  token: string;
}

export class ResponseLoginAdmin {
  @ApiProperty()
  message: string;
  @ApiProperty()
  user: AdminHttp;

  @ApiProperty()
  token: string;
}

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(
    private login: Login,
    private registerAdmin: RegisterAccountAdmin,
    private registerStudent: RegisterAccountStudent,
  ) {}

  @Post('login')
  @ApiResponse({ type: ResponseLoginStudent || ResponseLoginAdmin })
  async sigin(
    @Body() request: LoginBody,
  ): Promise<ResponseLoginStudent | ResponseLoginAdmin> {
    const { username, password } = request;
    const { token, admin, student } = await this.login.execute({
      username,
      password,
    });

    if (student) {
      return {
        message: 'Logado com sucesso',
        user: StudentViewModel.toHTTP(student),
        token,
      };
    }

    return {
      message: 'Logado com sucesso',
      user: AdminViewModel.toHTTP(admin),
      token,
    };
  }
}
