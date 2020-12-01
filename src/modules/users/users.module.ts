import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [MulterModule.register({
    dest: './upload',
  })],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
