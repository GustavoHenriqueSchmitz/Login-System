import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RecoverPassword {
  @IsString()
  email: string;
}

export class ResetPassword {
  token: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
  passwordConfirm: string;
}
