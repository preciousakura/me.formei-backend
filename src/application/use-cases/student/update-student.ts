import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { StudentsRepository } from '@application/repositories/students-repository';
import { UpdateStudentBody } from '@infra/http/dto/student/update-student.dto';
import { StudentNotFound } from '../errors/student-not-found';

interface UpdateStudentRequest {
  id: string;
  student: UpdateStudentBody;
}
interface UpdateStudentResponse {
  student: Student;
}

@Injectable()
export class UpdateStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(request: UpdateStudentRequest): Promise<UpdateStudentResponse> {
    const { student, id } = request;

    const studentFinded = await this.studentsRepository.findById(id);

    if (!studentFinded) throw new StudentNotFound();

    const data = Student.create(
      { ...studentFinded._props, ...student },
      studentFinded.id,
    );

    const studentUpdated = await this.studentsRepository.update(data);

    return {
      student: studentUpdated,
    };
  }
}
