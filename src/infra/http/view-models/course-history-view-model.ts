import { CourseHistory } from '@application/entities/course-history/course-history';
import { ApiProperty } from '@nestjs/swagger';

export class CourseHistoryViewModel {
  @ApiProperty()
  static toHTTP(courseHistory: CourseHistory) {
    const {
      id,
      createdAt,
      daysWeek,
      discipline,
      endTime,
      hours,
      semester,
      startTime,
      status,
      studentRegistration,
    } = courseHistory;

    return {
      id: id.toValue(),
      createdAt,
      daysWeek,
      discipline,
      endTime,
      hours,
      semester,
      startTime,
      status,
      studentRegistration,
    };
  }
}
