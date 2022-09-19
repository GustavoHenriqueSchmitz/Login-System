import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Payload } from '../dto/auth.dto';
import { AuthService } from '../auth.service';

// Local strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // Function validate, validate user
  async validate(
    email: string,
    password: string,
  ): Promise<Payload | HttpException> {
    // Validate user and get the payload
    const user: Payload | HttpException = await this.authService.validateUser(
      email,
      password,
    );

    // Return the payload
    return user;
  }
}
