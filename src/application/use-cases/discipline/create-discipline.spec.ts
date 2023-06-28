import { makeCourse } from '@test/factories/course-factory';
import { makeCurriculum } from '@test/factories/curriculum-factory';
import { makeUniversity } from '@test/factories/university-factory';
import { InMemoryCoursesRepository } from '@test/repositories/in-memory-courses-repository';
import { InMemoryCurriculumsRepository } from '@test/repositories/in-memory-curriculums-repository';
import { InMemoryDisciplinesRepository } from '@test/repositories/in-memory-disciplines-repository';
import { CurriculumNotFound } from '../errors/curriculum-not-found';
import { CreateDiscipline } from './create-discipline';

describe('Create discipline', () => {
  it('should be able to create a discipline', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();

    const course = makeCourse();

    coursesRepository.create(course);

    const university = makeUniversity();

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
      bibliography: ['livro tal'],
      prerequisites: [],
    });

    expect(disciplinesRepository.disciplines).toHaveLength(1);
    expect(disciplinesRepository.disciplines[0]).toEqual(discipline);
  });

  it('should not be able to create a discipline if non existing curriculum', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();

    const course = makeCourse();

    coursesRepository.create(course);

    const university = makeUniversity();

    const curriculum = makeCurriculum({
      course: course,
      university: university,
    });

    curriculumsRepository.create(curriculum);

    const createDiscipline = new CreateDiscipline(
      disciplinesRepository,
      curriculumsRepository,
    );

    expect(() => {
      return createDiscipline.execute({
        curriculumId: 'fake curriculum-id',
        cod: 'example code',
        optional: false,
        name: 'Example name',
        courseOutline: 'xxx',
        semester: 1,
        description: 'Example description',
        bibliography: ['livro tal'],
        prerequisites: [],
      });
    }).rejects.toThrow(CurriculumNotFound);
  });

  it('should not be able to create a discipline if non existing discipline prerequisite', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();

    const course = makeCourse();

    coursesRepository.create(course);

    const university = makeUniversity();

    const curriculum = makeCurriculum({
      course: course,
      university: university,
    });

    curriculumsRepository.create(curriculum);

    const createDiscipline = new CreateDiscipline(
      disciplinesRepository,
      curriculumsRepository,
    );

    expect(() => {
      return createDiscipline.execute({
        curriculumId: 'fake curriculum-id',
        cod: 'example code',
        optional: false,
        name: 'Example name',
        courseOutline: 'xxx',
        semester: 1,
        description: 'Example description',
        bibliography: ['livro tal'],
        prerequisites: ['example code'],
      });
    }).rejects.toThrow(CurriculumNotFound);
  });

  it('should be able to create a discipline with prerequisite', async () => {
    const disciplinesRepository = new InMemoryDisciplinesRepository();
    const curriculumsRepository = new InMemoryCurriculumsRepository();
    const coursesRepository = new InMemoryCoursesRepository();

    const course = makeCourse();

    coursesRepository.create(course);

    const university = makeUniversity();

    const curriculum = makeCurriculum({
      course: course,
      university: university,
    });

    curriculumsRepository.create(curriculum);
    const createDiscipline = new CreateDiscipline(
      disciplinesRepository,
      curriculumsRepository,
    );

    const { discipline: discipline1 } = await createDiscipline.execute({
      cod: 'cod1',
      optional: false,
      name: 'Example name',
      courseOutline: 'xxx',
      semester: 1,
      description: 'Example description',
      curriculumId: curriculum.id.toString(),
      bibliography: ['livro tal'],
      prerequisites: [],
    });

    const { discipline: discipline2 } = await createDiscipline.execute({
      cod: 'example code',
      optional: false,
      name: 'Example name',
      courseOutline: 'xxx',
      semester: 1,
      description: 'Example description',
      curriculumId: curriculum.id.toString(),
      bibliography: ['livro tal'],
      prerequisites: [discipline1.cod],
    });

    expect(disciplinesRepository.disciplines).toHaveLength(2);
    expect(disciplinesRepository.disciplines[0]).toEqual(discipline1);
    expect(disciplinesRepository.disciplines[1]).toEqual(discipline2);
  });
});
