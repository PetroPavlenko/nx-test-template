import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@nx-test-template/database';
import { ConfigModule } from '@nx-test-template/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
