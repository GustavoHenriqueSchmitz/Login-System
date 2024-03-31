import { IsString } from 'class-validator';

export class Payload {
  id: number;
}

export class Login {
  accessToken: string;
}

export class Token {
  @IsString()
  token: string;
}
