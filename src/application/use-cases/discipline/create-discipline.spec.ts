import { makeCourse } from '@test/factories/course-factory';
import { makeCurriculum } from '@test/factories/curriculum-factory';
import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryDisciplinesRepository } from '@test/repositories/in-memory-disciplines-repository';
import { InMemoryUniversitiesRepository } from '@test/repositories/in-memory-universities-repository';
import { CreateDiscipline } from './create-discipline';

describe('Create discipline', () => {
  it('should be able to create a discipline', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();
    const universitiesRepository = new InMemoryUniversitiesRepository();

    const course = makeCourse();

    coursesRepository.create(course);

    const university = makeUniversity();

    universitiesRepository.create(university);
    const curriculum = makeCurriculum({
      course: course,
      university: university,
    });

    curriculumsRepository.create(curriculum);

    const createDiscipline = new CreateDiscipline(
      disciplinesRepository,
      curriculumsRepository,
    );

    const { discipline } = await createDiscipline.execute({
      cod: 'example code',
      optional: false,
      name: 'Example name',
      courseOutline: 'xxx',
      semester: 1,
      description: 'Example description',
      curriculumId: curriculum.id.toString(),
    });

    expect(disciplinesRepository.disciplines).toHaveLength(1);
    expect(disciplinesRepository.disciplines[0]).toEqual(discipline);
  });
});
