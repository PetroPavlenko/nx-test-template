import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { RootController } from './root.controller';
import { DatabaseModule } from '@libs/database/database.module';
import { ConfigModule } from '@libs/config/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
