import { Course } from '@application/entities/curriculum/course';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Curriculum, Course as RawCoursePrisma } from '@prisma/client';
export class PrismaCourseMapper {
  static toPrisma(course: Course): RawCoursePrisma {
    return {
      id: course.id.toValue(),
      name: course.name,
    };
  }

  static toDomain(raw: RawCourse): Course {
    return Course.create(
      {
        name: raw.name,
        curriculums: raw?.curriculums?.map((curriculum) => curriculum.id),
      },
      new UniqueEntityID(raw.id),
    );
  }
}

type RawCourse = RawCoursePrisma & {
  curriculums: Curriculum[];
};
