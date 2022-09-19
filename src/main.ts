import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

// Function initServer, to initialize the server
async function initServer(): Promise<void> {
  // Generate the server and swagger config
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Login System')
    .setDescription(
      '## A login API, with routes: Login, RefreshToken and RecoverPassword.',
    )
    .setVersion('1.0')
    .build();

  // Init swagger
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // Init server
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}

initServer();
