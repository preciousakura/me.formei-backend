import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum EnrollmentSemester {
  FIRST = 1,
  SECOND = 2,
}

export class CreateStudentBody {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Precisa ser um email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Matricula do aluno', example: '493450' })
  @IsNotEmpty()
  registration: string;

  @ApiProperty()
  @IsNotEmpty()
  curriculumId: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: '1 ou 2', example: 1 })
  @IsNotEmpty()
  @IsEnum(EnrollmentSemester)
  enrollmentSemester: number;

  @ApiProperty({ example: '2023' })
  @IsNotEmpty()
  @IsDateString()
  enrollmentYear: number;
}
