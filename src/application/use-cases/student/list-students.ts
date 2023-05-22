import { Injectable } from '@nestjs/common';

import { Student } from '@application/entities/student/student';
import { StudentsRepository } from '@application/repositories/students-repository';

interface ListStudentsResponse {
  students: Student[];
}

@Injectable()
export class ListStudents {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(): Promise<ListStudentsResponse> {
    const students = await this.studentsRepository.list();

    return {
      students,
    };
  }
}
