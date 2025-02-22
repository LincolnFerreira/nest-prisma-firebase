require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Create an Express server
const server: express.Express = express();

// Define a function to create a NestJS server within an Express instance
export const createNestServer = async (expressInstance: express.Express) => {
  // Create an ExpressAdapter with the Express instance
  const adapter = new ExpressAdapter(expressInstance);

  // Create a NestJS application using the AppModule and the adapter
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {},
  );
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('Documentação da API de usuários')
    .setVersion('1.0')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS for the application
  app.enableCors();
  // Initialize the application and return it
  await app.listen(3000);
  return app.init();
};

// Create the NestJS server and log the status
createNestServer(server)
  .then((v) => console.log('Nest Ready')) // Log success message
  .catch((err) => console.error('Nest broken', err)); // Log error message

// Export the Express server as a Firebase cloud function
export const api: functions.HttpsFunction = functions.https.onRequest(server);
