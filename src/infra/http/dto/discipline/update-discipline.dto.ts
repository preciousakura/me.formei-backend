import { PartialType } from '@nestjs/swagger';
import { CreateDisciplineBody } from './create-discipline.dto';

export class UpdateDisciplineBody extends PartialType(CreateDisciplineBody) {}
