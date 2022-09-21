import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserEnt } from './entities/user.entity';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from 'src/app.dto';
import { users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    createUserEnt: CreateUserEnt,
  ): Promise<HttpException | ResponseDto> {
    const user: CreateUserEnt = {
      ...createUserEnt,
      password: await bcrypt.hash(createUserEnt.password, 10),
      role: 3,
    };

    try {
      const user: users = await this.prisma.users.findUnique({
        where: {
          email: createUserEnt.email,
        },
      });

      if (user) {
        return new HttpException(
          { msg: 'the user already exists', err: true },
          400,
        );
      }
    } catch (err) {
      return new HttpException(
        { msg: 'internal server error', err: true },
        500,
      );
    }

    try {
      await this.prisma.users.create({ data: user });
    } catch (err) {
      return new HttpException(
        { msg: 'failed to register user', err: true },
        500,
      );
    }

    return { msg: 'user registered with success', err: false };
  }
}
