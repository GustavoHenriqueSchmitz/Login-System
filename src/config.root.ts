import { ConfigModule } from '@nestjs/config';

export const configModule = ConfigModule.forRoot({
  envFilePath: `.env.${process.env}`,
  isGlobal: true,
});
