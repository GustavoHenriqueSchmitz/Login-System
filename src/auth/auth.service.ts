import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { Payload, RecoverPassword, User } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IMailGunData } from './dto/email.dto';
import * as Mailgun from 'mailgun-js';

// Authentication services
@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;
  private mg: Mailgun.Mailgun;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL');

    this.mg = Mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_API_DOMAIN'),
    });
  }

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
        { msg: 'email and/or password invalid', err: true },
        401,
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

  async passwordRecover(bodyData: RecoverPassword): Promise<HttpException> {
    let user: User;

    try {
      user = await this.prisma.users.findUnique({
        where: {
          email: bodyData.email,
        },
      });
    } catch (err) {
      return new HttpException({ msg: 'invalid email', err: true }, 400);
    }

    const token: { access_token: string } | HttpException = await this.login(
      user,
    );
    const forgotLink = `${this.clientAppUrl}/auth/fo?token=${token}`;

    await this.send({
      from: this.configService.get<string>('JS_CODE_MAIL'),
      to: user.email,
      subject: 'Forgot Password',
      html: `
                <h3>Hello ${user.name}!</h3>
                <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
            `,
    });
  }

  send(data: IMailGunData): Promise<Mailgun.messages.SendResponse> {
    return new Promise((res, rej) => {
      this.mg.messages().send(data, function (error, body) {
        if (error) {
          rej(error);
        }
        res(body);
      });
    });
  }
}
