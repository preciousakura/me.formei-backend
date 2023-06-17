import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Discipline } from '../discipline/discipline';

export type StatusType = 'DONE' | 'INPROGRESS' | 'FAILED' | 'WITHDRAWAL';

export interface CourseHistoryProps {
  studentRegistration: string;
  discipline: Discipline;
  status: StatusType;
  createdAt: string;
  semester: number;
  startTime: string;
  endTime: string;
  hours: number;
  daysWeek: string[];
}

export class CourseHistory extends Entity<CourseHistoryProps> {
  public _props: CourseHistoryProps;
  static create(props: CourseHistoryProps, id?: UniqueEntityID) {
    const courseHistory = new CourseHistory(props, id);
    return courseHistory;
  }

  public set studentRegistration(studentRegistration: string) {
    this.props.studentRegistration = studentRegistration;
  }

  public get studentRegistration() {
    return this.props.studentRegistration;
  }

  public set discipline(discipline: Discipline) {
    this.props.discipline = discipline;
  }

  public get discipline() {
    return this.props.discipline;
  }

  public set status(status: StatusType) {
    this.props.status = status;
  }

  public get status() {
    return this.props.status;
  }

  public set createdAt(createdAt: string) {
    this.props.createdAt = createdAt;
  }

  public get createdAt() {
    return this.props.createdAt;
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
