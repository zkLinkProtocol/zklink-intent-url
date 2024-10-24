import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { hexTransformer } from '../transformers/hex.transformer';

@Entity()
@Index(['address'], { unique: true })
@Index(['tgUserId'], { unique: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public address: string;

  @Column({ type: 'varchar', nullable: true })
  public tgUserId: string;

  @Column({ type: 'varchar', nullable: true })
  public tgUserName: string;
}
