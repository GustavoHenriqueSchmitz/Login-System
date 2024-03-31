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
      '## Uma API de login, com funcionalidades: Login, RefreshToken, RecoverPassword, Logout e validações.',
    )
    .setVersion('2.0')
    .build();

  // Init swagger
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  });

  // Init server
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}

initServer();
