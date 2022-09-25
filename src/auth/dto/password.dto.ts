import { IsEmail } from 'class-validator';

export class RecoverPassword {
  @IsEmail()
  email: string;
}

export class ResetPassword {
  token: string;
  password: string;
  passwordConfirm: string;
}
