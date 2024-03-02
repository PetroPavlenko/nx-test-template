import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: 'apps/account-api/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_USER: Joi.string().required(),
        MONGODB_PASS: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
