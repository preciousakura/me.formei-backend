import { Injectable } from '@nestjs/common';

import {
  CourseHistory,
  StatusType,
} from '@application/entities/course-history/course-history';
import { CourseHistoriesRepository } from '@application/repositories/course-histories-repository';
import { DisciplinesRepository } from '@application/repositories/disciplines-repository';
import { StudentsRepository } from '@application/repositories/students-repository';
import { DisciplineNotFound } from '../errors/discipline-not-found';
import { StudentNotFound } from '../errors/student-not-found';

interface CreateCourseHistoryRequest {
  studentRegistration: string;
  disciplineId: string;
  status: StatusType;
  createdAt: string;
  semester: number;
  startTime: string;
  endTime: string;
  hours: number;
  daysWeek: string[];
}

interface CreateCourseHistoryResponse {
  courseHistory: CourseHistory;
}

@Injectable()
export class AssociateDisciplineInStudentSemester {
  constructor(
    private courseHistoriesRepository: CourseHistoriesRepository,
    private studentsRepository: StudentsRepository,
    private disciplinesRepository: DisciplinesRepository,
  ) {}

  async execute(
    request: CreateCourseHistoryRequest,
  ): Promise<CreateCourseHistoryResponse> {
    const {
      studentRegistration,
      disciplineId,
      status,
      createdAt,
      semester,
      startTime,
      endTime,
      hours,
      daysWeek,
    } = request;

    const student = await this.studentsRepository.findById(studentRegistration);

    if (!student) {
      throw new StudentNotFound();
    }

    const discipline = await this.disciplinesRepository.findById(disciplineId);

    if (!discipline) {
      throw new DisciplineNotFound();
    }

    const courseHistory = CourseHistory.create({
      studentRegistration,
      discipline,
      status,
      createdAt,
      semester,
      startTime,
      endTime,
      hours,
      daysWeek,
    });

    await this.courseHistoriesRepository.create(courseHistory);

    return {
      courseHistory,
    };
  }
}
