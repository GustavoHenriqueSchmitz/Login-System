import { IsString, MaxLength } from 'class-validator';

export class RecoverPassword {
  @IsString()
  email: string;
}

export class ResetPassword {
  token: string;

  @IsString()
  @MaxLength(255)
  password: string;
  passwordConfirm: string;
}
