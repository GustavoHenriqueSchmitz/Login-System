import { IsString } from 'class-validator';

export class Payload {
  id: number;
  name: string;
  email: string;
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class Login {
  accessToken: string;
}

export class Token {
  @IsString()
  token: string;
}
