import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExtraCurricularActivityBody {
  @ApiProperty()
  @IsNotEmpty()
  studentRegistration: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  hours: number;

  @ApiProperty()
  @IsNotEmpty()
  situation: string;

  @ApiProperty()
  @IsNotEmpty()
  activityType: string;

  @ApiProperty()
  @IsNotEmpty()
  participationType?: string;

  @ApiProperty()
  @IsNotEmpty()
  atUfc: boolean;

  @ApiProperty()
  @IsNotEmpty()
  institutionName: string;

  @ApiProperty()
  @IsNotEmpty()
  institutionCountry?: string;

  @ApiProperty()
  @IsNotEmpty()
  institutionCnpj?: string;
}
