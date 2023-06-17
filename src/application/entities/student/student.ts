import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Course } from '../curriculum/course';
import { University } from '../curriculum/university';
import { User, UserProps } from '../user/user';

export interface StudentProps extends UserProps {
  registration: string;
  curriculumId: string;
  studentId?: UniqueEntityID;
  enrollmentYear: number;
  enrollmentSemester: number;
  currentSemester?: number;
  course: Course;
  university: University;
}

export class Student extends User<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(
      {
        ...props,
        studentId: props.studentId ?? new UniqueEntityID(),
        currentSemester: CurrentSemesterCalculator(
          props.enrollmentYear,
          props.enrollmentSemester,
        ),
      },
      id,
    );
    return student;
  }

  public get _props() {
    return this.props;
  }

  public set registration(registration: string) {
    this.props.registration = registration;
  }

  public get registration() {
    return this.props.registration;
  }

  public set curriculumId(curriculumId: string) {
    this.props.curriculumId = curriculumId;
  }

  public get curriculumId() {
    return this.props.curriculumId;
  }

  public set studentId(studentId: UniqueEntityID) {
    this.props.studentId = studentId;
  }

  public get studentId() {
    return this.props.studentId;
  }

  public set enrollmentYear(enrollmentYear: number) {
    this.props.enrollmentYear = enrollmentYear;
  }

  public get enrollmentYear() {
    return this.props.enrollmentYear;
  }

  public set enrollmentSemester(enrollmentSemester: number) {
    this.props.enrollmentSemester = enrollmentSemester;
  }

  public get enrollmentSemester() {
    return this.props.enrollmentSemester;
  }

  public set currentSemester(currentSemester: number) {
    this.props.currentSemester = currentSemester;
  }

  public get currentSemester() {
    return this.props.currentSemester;
  }

  public set course(course: Course) {
    this.props.course = course;
  }

  public get course() {
    return this.props.course;
  }

  public set university(university: University) {
    this.props.university = university;
  }

  public get university() {
    return this.props.university;
  }
}

function CurrentSemesterCalculator(
  anoDeEntrada: number,
  semestreDeEntrada: number,
): number {
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;

  let semestreAtual: number;
  if (mesAtual >= 1 && mesAtual <= 6) {
    semestreAtual = 1;
  } else {
    semestreAtual = 2;
  }

  const diferencaAnos = anoAtual - anoDeEntrada;
  let semestresCompletos = diferencaAnos * 2;

  if (semestreDeEntrada === 1) {
    semestresCompletos += semestreAtual - 1;
  } else if (semestreDeEntrada === 2) {
    semestresCompletos += semestreAtual;
  }

  return semestresCompletos + 1;
}
