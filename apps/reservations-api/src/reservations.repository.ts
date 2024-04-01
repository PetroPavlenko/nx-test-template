import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@nx-test-template/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Reservation } from './models/reservation.entity';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectRepository(Reservation)
    reservationsRepository: Repository<Reservation>,
    entityManager: EntityManager
  ) {
    super(reservationsRepository, entityManager);
  }
}
