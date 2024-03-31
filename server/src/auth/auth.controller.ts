import {
  Body,
  Controller,
  HttpCode,
  Headers,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServiceResults, AppResponse } from 'src/app.dto';
import { AuthService } from './auth.service';
import { RecoverPassword, ResetPassword } from './dto/password.dto';
import { Token } from './dto/auth.dto';
import { Request, Response } from 'express';

// Authentication controller
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Function login, auth controller and route
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('/login')
  async login(
    @Req() req: Request & { user: ServiceResults },
    @Res() res: Response,
  ): Promise<Response<AppResponse>> {
    if (req.user.statusCode !== 200) {
      return res.status(req.user.statusCode).json({
        data: req.user.data,
        message: req.user.message,
        error: true,
      });
    }

    const results: ServiceResults = await this.authService.login(req.user.data);

    if (results.statusCode !== 200) {
      return res.status(results.statusCode).json({
        data: req.user.data,
        message: results.message,
        error: true,
      });
    }

    return res.json({
      data: results.data,
      message: results.message,
      error: false,
    });
  }

  // Function login, refresh controller and route
  @Put('/refresh')
  @HttpCode(200)
  async refreshToken(
    @Body() bodyData: Token,
    @Res() res: Response,
  ): Promise<Response<AppResponse>> {
    const results = await this.authService.refreshToken(bodyData.token);

    if (results.statusCode !== 200) {
      return res.status(results.statusCode).json({
        data: results.data,
        message: results.message,
        error: true,
      });
    }

    return res.json({
      data: results.data,
      message: results.message,
      error: false,
    });
  }

  @Post('/validateToken')
  @HttpCode(200)
  async validateToken(
    @Body() bodyData: Token,
    @Res() res: Response,
  ): Promise<Response<AppResponse>> {
    const results = await this.authService.validateToken(bodyData.token);

    if (results.statusCode !== 200) {
      return res.status(results.statusCode).json({
        data: results.data,
        message: results.message,
        error: true,
      });
    }

    return res.json({
      data: results.data,
      message: results.message,
      error: false,
    });
  }

  @Post('/recover')
  @HttpCode(200)
  async recoverPassword(
    @Body() body: RecoverPassword,
    @Res() res: Response,
  ): Promise<Response<AppResponse>> {
    const results = await this.authService.recoverPassword(body.email);

    if (results.statusCode !== 200) {
      return res.status(results.statusCode).json({
        data: results.data,
        message: results.message,
        error: true,
      });
    }

    return res.json({
      data: '',
      message: '',
      error: false,
    });
  }

  @Post('/reset')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  async resetPassword(
    @Headers('authorization') authorization: string,
    @Body() body: ResetPassword,
    @Res() res: Response,
  ): Promise<Response<AppResponse>> {
    const results = await this.authService.resetPassword(
      authorization.split(' ')[1],
      body.password,
      body.passwordConfirm,
    );

    if (results.statusCode !== 200) {
      return res.status(results.statusCode).json({
        data: results.data,
        message: results.message,
        error: true,
      });
    }

    res.json({
      data: results.data,
      message: results.message,
      error: false,
    });
  }

  @Post('/logout')
  @HttpCode(200)
  async logout(
    @Body() body: Token,
    @Res() res: Response,
  ): Promise<Response<AppResponse>> {
    const results = await this.authService.logout(body.token);

    if (results.statusCode !== 200) {
      return res.status(results.statusCode).json({
        data: results.data,
        message: results.message,
        error: true,
      });
    }

    res.json({
      data: results.data,
      message: results.message,
      error: false,
    });
  }
}
