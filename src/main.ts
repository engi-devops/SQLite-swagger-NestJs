import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function nestJsSQLiteApplication() {
  const app = await NestFactory.create(AppModule);

  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  app.enableCors();

  const port = 3000;

  await app.listen(port, () =>
    console.log(
      `Nest Js with sequelize SQLite App listening on port ${port} !`,
    ),
  );
}
nestJsSQLiteApplication();
