import { CourseHistory } from '@application/entities/course-history/course-history';
export abstract class CourseHistoriesRepository {
  abstract create(courseHistory: CourseHistory): Promise<void>;
  abstract findById(courseHistoryId: string): Promise<CourseHistory | null>;
  abstract update(courseHistory: CourseHistory): Promise<CourseHistory>;
  abstract delete(courseHistoryId: string): Promise<void>;
  abstract list(): Promise<CourseHistory[] | []>;
}
