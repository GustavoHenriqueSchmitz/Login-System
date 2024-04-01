import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  password: string;
}
