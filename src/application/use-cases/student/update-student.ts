import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { StudentsRepository } from '@application/repositories/students-repository';
import { StudentNotFound } from '../errors/student-not-found';

interface UpdateStudentRequest {
  student: Student;
}
interface UpdateStudentResponse {
  student: Student;
}

@Injectable()
export class UpdateStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(request: UpdateStudentRequest): Promise<UpdateStudentResponse> {
    const { student } = request;

    const studentFinded = await this.studentsRepository.findById(
      student.studentId.toString(),
    );

    if (!studentFinded) throw new StudentNotFound();

    const studentUpdated = await this.studentsRepository.update(student);

    return {
      student: studentUpdated,
    };
  }
}
