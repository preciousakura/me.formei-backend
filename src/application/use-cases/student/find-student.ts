import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { StudentsRepository } from '@application/repositories/students-repository';
import { StudentNotFound } from '../errors/student-not-found';

interface FindStudentRequest {
  studentId: string;
}
interface FindStudentResponse {
  student: Student;
}

@Injectable()
export class FindStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(request: FindStudentRequest): Promise<FindStudentResponse> {
    const { studentId } = request;
    const student = await this.studentsRepository.findById(studentId);

    if (!student) throw new StudentNotFound();

    return {
      student,
    };
  }
}
