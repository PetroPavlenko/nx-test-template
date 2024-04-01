import { AbstractEntity } from '@nx-test-template/database';
import { Entity, Column } from 'typeorm';

@Entity()
export class Reservation extends AbstractEntity<Reservation> {
  @Column()
  timestamp: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  userId: string;

  @Column()
  placeId: string;

  @Column()
  invoiceId: string;
}
