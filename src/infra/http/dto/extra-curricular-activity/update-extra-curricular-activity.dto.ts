import { PartialType } from '@nestjs/swagger';
import { CreateExtraCurricularActivityBody } from './create-extra-curricular-activity.dto';

export class UpdateExtraCurricularActivityBody extends PartialType(
  CreateExtraCurricularActivityBody,
) {}
