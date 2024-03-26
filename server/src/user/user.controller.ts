import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserEnt } from './entities/user.entity';
import { AppResponse } from 'src/app.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(201)
  async createUser(
    @Body() createUserEnt: CreateUserEnt,
    @Res() res: Response,
  ): Promise<Response<AppResponse>> {
    const results = await this.userService.createUser(createUserEnt);

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
}
