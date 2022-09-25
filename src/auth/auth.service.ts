import { Body, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { Payload, User } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { ResponseDto } from 'src/app.dto';
import { RecoverPassword, ResetPassword } from './dto/password.dto';
import { IsEmail } from 'class-validator';
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
  async login(
    user: Payload,
  ): Promise<{ access_token: string } | HttpException> {
    // Define the payload of the token
    const payload: Payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate and save the token
    const token: string = this.jwtService.sign(payload);
    const error: string = await this.saveToken(token, payload.email);

    if (error) {
      return new HttpException(
        { msg: 'failed to perform the login', err: true },
        500,
      );
    }

    return {
      access_token: token,
    };
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
  async refreshToken(oldToken: string): Promise<
    | HttpException
    | {
        data: { access_token: string } | HttpException;
        msg: string;
        err: boolean;
      }
  > {
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
        return new HttpException({ msg: 'invalid token', err: true }, 401);
      }

      // Create a new token
      return { data: await this.login(user), msg: null, err: false };
    } else {
      return new HttpException({ msg: 'invalid token', err: true }, 401);
    }
  }

  // Function validateUser, validate the user.
  async validateUser(
    email: string,
    password: string,
  ): Promise<Payload | HttpException> {
    let user: User;

    // Catch user by email
    try {
      user = await this.prisma.users.findUnique({
        where: {
          email: email,
        },
      });
    } catch (err) {
      return new HttpException(
        { msg: 'email and/or password invalid', err: true },
        401,
      );
    }

    // Validate the password
    try {
      if ((await bcrypt.compare(password, user.password)) === false) {
        return new HttpException(
          { msg: 'email and/or password invalid', err: true },
          401,
        );
      }
    } catch (err) {
      return new HttpException(
        { msg: 'email and/or password invalid', err: true },
        401,
      );
    }

    // Return the user payload, for the token, if validate is successfully
    return { id: user.id, email: user.email, role: user.role };
  }

  async recoverPassword(email: string): Promise<ResponseDto | HttpException> {
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
        return new HttpException(
          { msg: 'internal server error', err: true },
          500,
        );
      }
    }
    const url = `htpp://localhost:3000/reset/${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password!',
      html: `Click <a href="${url}}">here</a> to reset your password!`,
    });

    return { msg: 'Please check your email!', err: false };
  }

  async resetPassword(
    token: string,
    password: string,
    passwordConfirm: string,
  ): Promise<HttpException | ResponseDto> {
    if (password !== passwordConfirm) {
      return new HttpException(
        { msg: 'Password do not match', err: true },
        400,
      );
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
      return new HttpException({ msg: 'user not found', err: true }, 404);
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

    return { msg: 'Password reseted', err: false };
  }
}
