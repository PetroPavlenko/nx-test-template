/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as LogPipe } from 'nestjs-pino';

// import { UsersModule } from './users/users.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('second');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(LogPipe));
  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/users`);
}

bootstrap();
