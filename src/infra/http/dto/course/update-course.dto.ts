import { PartialType } from '@nestjs/swagger';
import { CreateCourseBody } from './create-course.dto';

export class UpdateCourseBody extends PartialType(CreateCourseBody) {}
