import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Discipline } from '../discipline/discipline';
import { Student } from '../student/student';

export interface CourseHistoryProps {
  student: Student;
  discipline: Discipline;
  status: string;
  createAt: string;
  semester: number;
  startTime: string;
  endTime: string;
  hours: number;
  daysWeek: string[];
}

export class CourseHistory extends Entity<CourseHistoryProps> {
  static create(props: CourseHistoryProps, id?: UniqueEntityID) {
    const courseHistory = new CourseHistory(props, id);
    return courseHistory;
  }

  public set student(student: Student) {
    this.props.student = student;
  }

  public get student() {
    return this.props.student;
  }

  public set discipline(discipline: Discipline) {
    this.props.discipline = discipline;
  }

  public get discipline() {
    return this.props.discipline;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get status() {
    return this.props.status;
  }

  public set createAt(createAt: string) {
    this.props.createAt = createAt;
  }

  public get createAt() {
    return this.props.createAt;
  }

  public set semester(semester: number) {
    this.props.semester = semester;
  }

  public get semester() {
    return this.props.semester;
  }

  public set startTime(startTime: string) {
    this.props.startTime = startTime;
  }

  public get startTime() {
    return this.props.startTime;
  }

  public set endTime(endTime: string) {
    this.props.endTime = endTime;
  }

  public get endTime() {
    return this.props.endTime;
  }

  public set hours(hours: number) {
    this.props.hours = hours;
  }

  public get hours() {
    return this.props.hours;
  }

  public set daysWeek(daysWeek: string[]) {
    this.props.daysWeek = daysWeek;
  }

  public get daysWeek() {
    return this.props.daysWeek;
  }
}
