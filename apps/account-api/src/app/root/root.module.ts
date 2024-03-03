import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { RootController } from './root.controller';
import { DatabaseModule } from '@nx-test-template/database';
import { ConfigModule } from '@nx-test-template/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
