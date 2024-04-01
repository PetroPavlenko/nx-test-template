import { PrimaryGeneratedColumn } from 'typeorm';

interface ObjectLiteral {
  [key: string]: any;
}

export class AbstractEntity<T extends ObjectLiteral> {
  @PrimaryGeneratedColumn()
  id!: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
