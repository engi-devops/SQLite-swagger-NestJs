import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import swaggerDoc from './swaggerDoc/index.json';

async function nestJsSQLiteApplication() {
  const app = await NestFactory.create(AppModule);

  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const options = new DocumentBuilder()
  .setTitle('Users')
  .setDescription('The users API description')
  .setVersion('1.0')
  .addTag('users')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, swaggerDoc );
  const port = 3000;

  await app.listen(port, () =>
    console.log(
      `Nest Js with sequelize SQLite App listening on port ${port} !`,
    ),
  );
}
nestJsSQLiteApplication();
