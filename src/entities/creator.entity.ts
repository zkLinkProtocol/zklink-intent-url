import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { hexTransformer } from '../transformers/hex.transformer';

export enum CreatorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
@Index(['address'], { unique: true })
export class Creator extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public address: string;

  @Column({ type: 'varchar', nullable: true })
  public tgUserId: string;

  @Column({ type: 'varchar', nullable: true })
  public tgUserName: string;

  @Column({ type: 'enum', enum: CreatorStatus })
  public status: CreatorStatus;
}
