import { PartialType } from '@nestjs/swagger';
import { CreateCurriculumBody } from './create-curriculum.dto';

export class UpdateCurriculumBody extends PartialType(CreateCurriculumBody) {}
