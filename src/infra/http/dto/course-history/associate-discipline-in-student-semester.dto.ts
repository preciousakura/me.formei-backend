import { StatusType } from '@application/entities/course-history/course-history';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum Semester {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
  SIXTH = 6,
  SEVENTH = 7,
  EIGHTH = 8,
  NINTH = 9,
  TENTH = 10,
  ELEVENTH = 11,
  TWELFTH = 12,
}

export enum StatusCourseHistory {
  DONE = 'DONE',
  INPROGRESS = 'INPROGRESS',
  FAILED = 'FAILED',
  WITHDRAWAL = 'WITHDRAWAL',
}

export class AssociateDisciplineInStudentSemesterBody {
  @ApiProperty()
  @IsNotEmpty()
  disciplines: AssociateDiscipline[];
}

export class AssociateDiscipline {
  @ApiProperty()
  @IsNotEmpty()
  disciplineId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StatusCourseHistory)
  status: StatusType;

  @ApiProperty()
  @IsNotEmpty()
  createdAt: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsEnum(Semester)
  // semester: number;

  @ApiProperty()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty()
  @IsNotEmpty()
  hours: number;

  @ApiProperty()
  @IsNotEmpty()
  daysWeek: string[];
}
