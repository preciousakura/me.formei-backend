import { PartialType } from '@nestjs/swagger';
import { CreateUniversityBody } from './create-university.dto';

export class UpdateUniversityBody extends PartialType(CreateUniversityBody) {}
