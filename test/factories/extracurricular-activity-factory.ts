import {
  ExtraCurricular,
  ExtraCurricularProps,
} from '@application/entities/extracurricular-activities/extracurricular-activities';

type Override = Partial<ExtraCurricularProps>;

export function makeExtraCurricularActivity(override: Override = {}) {
  return ExtraCurricular.create({
    activityType: 'example',
    atUfc: false,
    endDate: new Date(),
    hours: 1,
    institutionName: 'example',
    situation: 'DEFERIDO',
    startDate: new Date(),
    studentRegistration: 'example',
    title: 'example',
    institutionCnpj: 'example',
    institutionCountry: 'example',
    participationType: 'example',
    ...override,
  });
}
