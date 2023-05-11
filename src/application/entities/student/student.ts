import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { User, UserProps } from '../user/user';

export interface StudentProps extends UserProps {
  registration: string;
  curriculumId: string;
  studentId?: UniqueEntityID;
  enrollmentYear: number;
  enrollmentSemester: number;
  currentSemester: number;
  course: string;
  university: string;
}

export class Student extends User<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id);
    return student;
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

  public set course(course: string) {
    this.props.course = course;
  }

  public get course() {
    return this.props.course;
  }

  public set university(university: string) {
    this.props.university = university;
  }

  public get university() {
    return this.props.university;
  }
}
