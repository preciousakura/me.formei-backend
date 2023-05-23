import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEnum, IsInt, IsNumber, IsDateString } from 'class-validator';

export enum EnrollmentSemester {
  FIRST = 1,
  SECOND = 2
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

  @ApiProperty()
  @IsNotEmpty()
  registration: string;

  @ApiProperty()
  @IsNotEmpty()
  curriculumId: string;

  @ApiProperty()
  @IsNotEmpty()
  cityId: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  currentSemester: number;

  @ApiProperty({description: "1 ou 2"})
  @IsNotEmpty()
  @IsEnum(EnrollmentSemester)
  enrollmentSemester: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  enrollmentYear: number
}


