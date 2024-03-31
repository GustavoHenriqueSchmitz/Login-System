import { Injectable } from '@nestjs/common';
import { CreateUser } from './entities/user.entity';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ServiceResults } from 'src/app.dto';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { Payload } from 'src/auth/dto/auth.dto';
import { UserInformation } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(CreateUser: CreateUser): Promise<ServiceResults> {
    const user: CreateUser = {
      ...CreateUser,
      password: await bcrypt.hash(CreateUser.password, 10),
    };

    try {
      const user: users = await this.prisma.users.findUnique({
        where: {
          email: CreateUser.email,
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

  async getUserInformation(token: string): Promise<ServiceResults> {
    try {
      const tokenInformation: any = this.jwtService.decode(token);

      const user: UserInformation = await this.prisma.users.findUnique({
        where: {
          id: tokenInformation.id,
        },
        select: {
          name: true,
          email: true,
        },
      });

      return {
        data: user,
        message: 'Information got with success',
        statusCode: 200,
      };
    } catch {
      return {
        data: null,
        message: 'failed while trying to get the user data',
        statusCode: 500,
      };
    }
  }
}
