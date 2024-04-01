import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ConfigModule, LoggerModule } from '@nx-test-template/config';
import { DatabaseModule } from '@nx-test-template/database';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './models/reservation.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Reservation]),
    ConfigModule,
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
