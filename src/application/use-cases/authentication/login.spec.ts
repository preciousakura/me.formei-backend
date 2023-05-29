import { User } from '@application/entities/user/user';
import { JwtService } from '@nestjs/jwt';
import { makeAdmin } from '@test/factories/admin-factory';
import { makeStudent } from '@test/factories/student-factory';
import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { EncriptionPassword } from './encription-password';
import { Login } from './login';

describe('Login', () => {
  it('should be able to signin a Admin', async () => {
    const adminsRepository = new InMemoryAdminsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const studentsRepository = new InMemoryStudentsRepository();
    const encriptionPassword = new EncriptionPassword();
    const jwtService = new JwtService();
    const pass = '123';
    const admin = makeAdmin({
      password: await encriptionPassword.execute({ password: pass }),
    });

    const user = User.create(
      {
        city: admin.city,
        email: admin.email,
        lastname: admin.lastname,
        name: admin.name,
        password: admin.password,
        state: admin.state,
        username: admin.username,
      },
      admin.id,
    );
    usersRepository.create(user);

    adminsRepository.create(admin);

    const loginAdmin = new Login(
      usersRepository,
      adminsRepository,
      studentsRepository,
      jwtService,
    );

    const { admin: AdminSignIn } = await loginAdmin.execute({
      username: admin.username,
      password: pass,
    });

    expect(AdminSignIn).toBeTruthy();
  });

  it('should be able to signin a Student', async () => {
    const adminsRepository = new InMemoryAdminsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const studentsRepository = new InMemoryStudentsRepository();
    const encriptionPassword = new EncriptionPassword();
    const jwtService = new JwtService();
    const pass = '123';
    const student = makeStudent({
      password: await encriptionPassword.execute({ password: pass }),
    });

    const user = User.create(
      {
        city: student.city,
        email: student.email,
        lastname: student.lastname,
        name: student.name,
        password: student.password,
        state: student.state,
        username: student.username,
      },
      student.id,
    );
    usersRepository.create(user);

    studentsRepository.create(student);

    const loginStudent = new Login(
      usersRepository,
      adminsRepository,
      studentsRepository,
      jwtService,
    );

    const { student: StudentSignIn } = await loginStudent.execute({
      username: student.username,
      password: pass,
    });

    expect(StudentSignIn).toBeTruthy();
  });
});
