import { Login } from '@application/use-cases/authentication/login';
import { RegisterAccountAdmin } from '@application/use-cases/authentication/register-admin';
import { RegisterAccountStudent } from '@application/use-cases/authentication/register-student';
import { ValidToken } from '@application/use-cases/authentication/valid-token';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request as RequestE } from 'express';
import { LoginBody } from '../dto/auth/login.dto';
import { RegisterAccountAdminBody } from '../dto/auth/register-account-admin.dto';
import { RegisterAccountStudentBody } from '../dto/auth/register-account-student.dto';
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

  @ApiProperty()
  isAdmin: boolean;
}

export class ResponseLoginAdmin {
  @ApiProperty()
  message: string;
  @ApiProperty()
  user: AdminHttp;

  @ApiProperty()
  token: string;

  @ApiProperty()
  isAdmin: boolean;
}

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(
    private login: Login,
    private registerAdmin: RegisterAccountAdmin,
    private registerStudent: RegisterAccountStudent,
    private validToken: ValidToken,
  ) {}

  @Post('signin')
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
        isAdmin: false,
      };
    }

    return {
      message: 'Logado com sucesso',
      user: AdminViewModel.toHTTP(admin),
      token,
      isAdmin: true,
    };
  }

  @Post('signup/admin')
  // @UseGuards(AuthGuard)
  @ApiResponse({ type: 'messagem' })
  async signupAdmin(@Body() request: RegisterAccountAdminBody) {
    const {
      username,
      password,
      city,
      state,
      email,
      lastname,
      name,
      passwordConfirmation,
    } = request;

    if (passwordConfirmation != password) {
      throw new BadRequestException('password confirmation error');
    }
    await this.registerAdmin.execute({
      username,
      password,
      city,
      state,
      email,
      lastname,
      name,
    });

    return {
      message: 'Registrado com sucesso',
    };
  }

  @Post('signup/student')
  @ApiResponse({ type: 'messagem' })
  async signupStudent(@Body() request: RegisterAccountStudentBody) {
    const {
      username,
      password,
      city,
      state,
      email,
      lastname,
      name,
      curriculumId,
      enrollmentSemester,
      enrollmentYear,
      registration,
      passwordConfirmation,
    } = request;

    if (passwordConfirmation != password) {
      throw new BadRequestException('password confirmation error');
    }

    await this.registerStudent.execute({
      username,
      password,
      city,
      state,
      email,
      lastname,
      name,
      curriculumId,
      enrollmentSemester,
      enrollmentYear,
      registration,
    });

    return {
      message: 'Registrado com sucesso',
    };
  }

  @Get('session')
  @ApiResponse({ type: Boolean })
  async session(@Request() req: RequestE) {
    const isValid = await this.validToken.execute(req);

    return isValid;
  }
}
