import { Module } from '@nestjs/common';
import { DatabaseModule } from '@nx-test-template/database';
import { LoggerModule } from '@nx-test-template/config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDocument, UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
