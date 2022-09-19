import { IsEmail } from 'class-validator';

export class Payload {
  id: number;
  email: string;
  role: number;
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
}

export class RecoverPassword {
  @IsEmail()
  email: string;
}
