import { PartialType } from '@nestjs/swagger';
import { CreateStudentBody } from './create-student.dto';

export class UpdateStudentBody extends PartialType(CreateStudentBody) {}
