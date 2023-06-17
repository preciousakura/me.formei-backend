import { StatusType } from '@application/entities/course-history/course-history';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import {
  Semester,
  StatusCourseHistory,
} from '../dto/course-history/associate-discipline-in-student-semester.dto';

export class CourseHistoryHttp {
  @ApiProperty()
  id: string;

  @ApiProperty()
  disciplineId: string;

  @ApiProperty()
  @IsEnum(StatusCourseHistory)
  status: StatusType;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  @IsEnum(Semester)
  semester: number;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  hours: number;

  @ApiProperty()
  daysWeek: string[];
}
