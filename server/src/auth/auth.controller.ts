import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from 'src/app.dto';
import { AuthService } from './auth.service';
import { RecoverPassword, ResetPassword } from './dto/password.dto';
import { RefreshToken } from './dto/auth.dto';

// Authentication controller
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Function login, auth controller and route
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('/login')
  async login(
    @Req() req: any,
  ): Promise<{ access_token: string } | HttpException> {
    return await this.authService.login(req.user);
  }

  // Function login, refresh controller and route
  @Put('/refresh')
  async refreshToken(
    @Body() bodyData: RefreshToken,
  ): Promise<HttpException | ResponseDto> {
    return await this.authService.refreshToken(bodyData.oldToken);
  }

  @Post('/recover/')
  async recoverPassword(@Body() body: RecoverPassword) {
    return await this.authService.recoverPassword(body.email);
  }

  @Post('/reset/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPassword,
  ) {
    return this.authService.resetPassword(
      token,
      body.password,
      body.passwordConfirm,
    );
  }
}
