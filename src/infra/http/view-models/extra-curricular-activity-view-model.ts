import { ExtraCurricular } from '@application/entities/extracurricular-activities/extracurricular-activities';
import { ApiProperty } from '@nestjs/swagger';

export class ExtraCurricularActivityViewModel {
  @ApiProperty()
  static toHTTP(extraCurricular: ExtraCurricular) {
    const {
      id,
      activityType,
      atUfc,
      endDate,
      hours,
      institutionCnpj,
      institutionCountry,
      institutionName,
      participationType,
      situation,
      startDate,
      studentRegistration,
      title,
    } = extraCurricular;

    return {
      id: id.toValue(),
      activityType,
      atUfc,
      endDate,
      hours,
      institutionCnpj,
      institutionCountry,
      institutionName,
      participationType,
      situation,
      startDate,
      studentRegistration,
      title,
    };
  }
}
