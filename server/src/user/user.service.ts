import { Injectable } from '@nestjs/common';
import { CreateUserEnt } from './entities/user.entity';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ServiceResults } from 'src/app.dto';
import { users } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserEnt: CreateUserEnt): Promise<ServiceResults> {
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
        return {
          data: null,
          message: 'the user already exists',
          statusCode: 400,
        };
      }
    } catch (err) {
      return {
        data: null,
        message: 'internal server error',
        statusCode: 500,
      };
    }

    try {
      await this.prisma.users.create({ data: user });
    } catch (err) {
      return {
        data: null,
        message: 'failed to register user',
        statusCode: 500,
      };
    }

    return {
      data: null,
      message: 'user registered with success',
      statusCode: 200,
    };
  }
}
