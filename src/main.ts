import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function nestJsSQLiteApplication() {
  const app = await NestFactory.create(AppModule);

  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = 3000;

  await app.listen(port, () =>
    console.log(
      `Nest Js with sequelize SQLite App listening on port ${port} !`,
    ),
  );
}
nestJsSQLiteApplication();
