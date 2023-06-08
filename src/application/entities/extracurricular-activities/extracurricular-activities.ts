import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

type SituationType = 'DEFERIDO' | 'INDEFERIDO' | 'SEM_RESPOSTA';

export interface ExtraCurricularProps {
  studentRegistration: string;
  title: string;
  startDate: Date;
  endDate: Date;
  hours: number;
  situation: SituationType;
  activityType: string;
  participationType?: string;
  atUfc: boolean;
  institutionName: string;
  institutionCountry?: string;
  institutionCnpj?: string;
}

export class ExtraCurricular extends Entity<ExtraCurricularProps> {
  static create(props: ExtraCurricularProps, id?: UniqueEntityID) {
    const extraCurricular = new ExtraCurricular(props, id);
    return extraCurricular;
  }

  public set studentRegistration(studentRegistration: string) {
    this.props.studentRegistration = studentRegistration;
  }

  public get studentRegistration() {
    return this.props.studentRegistration;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title() {
    return this.props.title;
  }

  public set startDate(startDate: Date) {
    this.props.startDate = startDate;
  }

  public get startDate() {
    return this.props.startDate;
  }

  public set endDate(endDate: Date) {
    this.props.endDate = endDate;
  }

  public get endDate() {
    return this.props.endDate;
  }

  public set hours(hours: number) {
    this.props.hours = hours;
  }

  public get hours() {
    return this.props.hours;
  }

  public set situation(situation: SituationType) {
    this.props.situation = situation;
  }

  public get situation() {
    return this.props.situation;
  }

  public set activityType(activityType: string) {
    this.props.activityType = activityType;
  }

  public get activityType() {
    return this.props.activityType;
  }

  public set participationType(participationType: string) {
    this.props.participationType = participationType;
  }

  public get participationType() {
    return this.props.participationType;
  }

  public set atUfc(atUfc: boolean) {
    this.props.atUfc = atUfc;
  }

  public get atUfc() {
    return this.props.atUfc;
  }

  public set institutionName(institutionName: string) {
    this.props.institutionName = institutionName;
  }

  public get institutionName() {
    return this.props.institutionName;
  }

  public set institutionCountry(institutionCountry: string) {
    this.props.institutionCountry = institutionCountry;
  }

  public get institutionCountry() {
    return this.props.institutionCountry;
  }

  public set institutionCnpj(institutionCnpj: string) {
    this.props.institutionCnpj = institutionCnpj;
  }

  public get institutionCnpj() {
    return this.props.institutionCnpj;
  }
}
