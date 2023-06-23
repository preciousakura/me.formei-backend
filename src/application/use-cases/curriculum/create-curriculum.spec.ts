import { makeCourse } from '@test/factories/course-factory';
import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { CourseNotFound } from '../errors/course-not-found';
import { UniversityNotFound } from '../errors/university-not-found';
import { CreateCurriculum } from './create-curriculum';

describe('Create curriculum', () => {
  it('should be able to create a curriculum', async () => {
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const course = makeCourse();
    coursesRepository.create(course);

    const university = makeUniversity();
    universitiesRepository.create(university);

    const createCurriculum = new CreateCurriculum(
      curriculumsRepository,
      coursesRepository,
      universitiesRepository,
    );

    const { curriculum } = await createCurriculum.execute({
      courseId: course.id.toString(),
      description: '',
      requiredHours: 0,
      optionalHours: 0,
      extraCurricularHours: 0,
      universityId: university.id.toString(),
    });

    expect(curriculumsRepository.curriculums).toHaveLength(1);
    expect(curriculumsRepository.curriculums[0]).toEqual(curriculum);
  });

  it('should not be able to create a durriculum if non existing university', async () => {
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const course = makeCourse();
    coursesRepository.create(course);

    const createCurriculum = new CreateCurriculum(
      curriculumsRepository,
      coursesRepository,
      universitiesRepository,
    );

    expect(() => {
      return createCurriculum.execute({
        courseId: course.id.toString(),
        description: 'example description',
        requiredHours: 0,
        optionalHours: 0,
        extraCurricularHours: 0,
        universityId: 'fake-id',
      });
    }).rejects.toThrow(UniversityNotFound);
  });

  it('should not be able to create a curriculum if non existing course', async () => {
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const university = makeUniversity();
    universitiesRepository.create(university);

    const createCurriculum = new CreateCurriculum(
      curriculumsRepository,
      coursesRepository,
      universitiesRepository,
    );

    expect(() => {
      return createCurriculum.execute({
        courseId: 'fake-id',
        description: 'example description',
        requiredHours: 0,
        optionalHours: 0,
        extraCurricularHours: 0,
        universityId: university.id.toString(),
      });
    }).rejects.toThrow(CourseNotFound);
  });
});
