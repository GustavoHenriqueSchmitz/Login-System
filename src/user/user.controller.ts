import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserEnt } from './entities/user.entity';
import { ResponseDto } from 'src/app.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(
    @Body() createUserEnt: CreateUserEnt,
  ): Promise<HttpException | ResponseDto> {
    return this.userService.createUser(createUserEnt);
  }
}
