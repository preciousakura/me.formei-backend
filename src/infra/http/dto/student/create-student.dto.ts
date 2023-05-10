import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStudentBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Precisa ser um email' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  registration: string;

  @IsNotEmpty()
  curriculumId: string;
}
