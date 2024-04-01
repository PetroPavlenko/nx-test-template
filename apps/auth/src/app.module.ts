import { Module } from '@nestjs/common';

import { ConfigModule } from '@nx-test-template/config';
import { DatabaseModule } from '@nx-test-template/database';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
