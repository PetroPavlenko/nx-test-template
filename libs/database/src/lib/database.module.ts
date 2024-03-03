import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
        user: config.get('MONGODB_USER'),
        pass: config.get('MONGODB_PASS'),
        dbName: 'account',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
