import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { StudentsRepository } from '@application/repositories/students-repository';
import { StudentNotFound } from '../errors/student-not-found';

interface DeleteStudentResponse {
  student: Student;
}
interface DeleteStudentRequest {
  studentId: string;
}

@Injectable()
export class DeleteStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(request: DeleteStudentRequest): Promise<DeleteStudentResponse> {
    const student = await this.studentsRepository.findById(request.studentId);

    if (!student) {
      throw new StudentNotFound();
    }

    await this.studentsRepository.delete(student.studentId.toString());

    return {
      student,
    };
  }
}
