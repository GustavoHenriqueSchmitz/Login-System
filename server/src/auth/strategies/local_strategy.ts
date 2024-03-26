import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ServiceResults } from 'src/app.dto';

// Local strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // Function validate, validate user
  async validate(email: string, password: string): Promise<ServiceResults> {
    // Validate user and get the payload
    const user: ServiceResults = await this.authService.validateUser(
      email,
      password,
    );

    // Return the payload
    return user;
  }
}
