import { ApiProperty } from '@nestjs/swagger';
import { SituationType } from '@prisma/client';

export class ExtraCurricularActivityHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  studentRegistration: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  hours: number;

  @ApiProperty()
  situation: SituationType;

  @ApiProperty()
  activityType: string;

  @ApiProperty()
  participationType?: string;

  @ApiProperty()
  atUfc: boolean;

  @ApiProperty()
  institutionName: string;

  @ApiProperty()
  institutionCountry?: string;

  @ApiProperty()
  institutionCnpj?: string;
}
