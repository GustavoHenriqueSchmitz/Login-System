import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { Payload, User } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { ServiceResults } from 'src/app.dto';
import { RecoverPassword } from './dto/password.dto';
import { users } from '@prisma/client';

// Authentication services
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  // Function login, generate a token
  async login(payload: Payload): Promise<ServiceResults> {
    // Generate and save the token
    const token: string = this.jwtService.sign(payload);
    const error: string = await this.saveToken(token, payload.email);

    if (error) {
      return {
        data: null,
        message: 'Error while trying to generate token',
        statusCode: 404,
      };
    }

    return { data: token, message: 'Token Generated.', statusCode: 200 };
  }

  // Function saveToken, save the new created token in the database
  async saveToken(token: string, email: string): Promise<string> {
    // Try to insert the token
    try {
      await this.prisma.token.create({
        data: {
          email: email,
          token: token,
        },
      });
      return;
    } catch (err) {
      // Try to update
      try {
        await this.prisma.token.update({
          where: {
            email: email,
          },
          data: {
            token: token,
          },
        });
        return;
      } catch (err) {
        return 'error trying to save token';
      }
    }
  }

  // Function refreshToken, refresh a token
  async refreshToken(oldToken: string): Promise<ServiceResults> {
    // Check if the token exists
    const token = await this.prisma.token.findFirst({
      where: {
        token: oldToken,
      },
    });

    if (token) {
      let user: Payload;

      // Catch the user of the token
      try {
        user = await this.prisma.users.findUnique({
          where: {
            email: token.email,
          },
          select: {
            id: true,
            email: true,
            role: true,
          },
        });
      } catch (err) {
        return { data: null, message: 'invalid token', statusCode: 401 };
      }

      const loginResults = await this.login(user);

      // Create a new token
      return {
        data: loginResults.data,
        message: loginResults.message,
        statusCode: loginResults.statusCode,
      };
    } else {
      return { data: null, message: 'invalid token', statusCode: 401 };
    }
  }

  async validateToken(token: string): Promise<ServiceResults> {
    try {
      this.jwtService.verify(token);
      return { data: null, message: 'Valid Token.', statusCode: 200 };
    } catch {
      return { data: null, message: 'Invalid Token', statusCode: 401 };
    }
  }

  // Function validateUser, validate the user.
  async validateUser(email: string, password: string): Promise<ServiceResults> {
    let user: User;

    // Catch user by email
    try {
      user = await this.prisma.users.findUnique({
        where: {
          email: email,
        },
      });
    } catch (err) {
      return {
        data: null,
        message: 'Error while trying to validate informations',
        statusCode: 401,
      };
    }

    // Validate the password
    try {
      if ((await bcrypt.compare(password, user.password)) === false) {
        return {
          data: null,
          message: 'email and/or password invalid',
          statusCode: 401,
        };
      }
    } catch (err) {
      return {
        data: null,
        message: 'email and/or password invalid',
        statusCode: 401,
      };
    }

    // Return the user payload, for the token, if validate is successfully
    return {
      data: { id: user.id, email: user.email, role: user.role },
      message: 'User is is valid.',
      statusCode: 200,
    };
  }

  async recoverPassword(email: string): Promise<ServiceResults> {
    const token = Math.random().toString(20).substring(2, 22);

    try {
      await this.prisma.recoverPassword.create({
        data: {
          email: email,
          token: token,
        },
      });
    } catch (err) {
      // Try to update
      try {
        await this.prisma.recoverPassword.update({
          where: {
            email: email,
          },
          data: {
            token: token,
          },
        });
      } catch (err) {
        return {
          data: null,
          message: 'internal server error',
          statusCode: 500,
        };
      }
    }
    const url = `http://localhost:5000/reset/${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Resete sua senha!',
      html: `<a href="${url}">Clique aqui</a> para resetar sua senha.`,
    });

    return { data: null, message: 'Please check your email!', statusCode: 200 };
  }

  async resetPassword(
    token: string,
    password: string,
    passwordConfirm: string,
  ): Promise<ServiceResults> {
    if (password !== passwordConfirm) {
      return { data: null, message: 'Password do not match', statusCode: 400 };
    }

    const passwordReset: RecoverPassword =
      await this.prisma.recoverPassword.findUnique({
        where: {
          token: token,
        },
      });

    const user: users = await this.prisma.users.findUnique({
      where: {
        email: passwordReset.email,
      },
    });

    if (!user) {
      return { data: null, message: 'user not found', statusCode: 404 };
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await this.prisma.recoverPassword.delete({
      where: {
        token: token,
      },
    });

    return { data: null, message: 'Password reseted', statusCode: 200 };
  }
}
