import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { hexTransformer } from '../transformers/hex.transformer';

export enum CreatorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
@Index(['publickey'], { unique: true })
@Index(['address'], { unique: true })
export class Creator extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'varchar', nullable: true })
  public publicId: string;

  @Column({ type: 'bytea', transformer: hexTransformer, nullable: true })
  public publickey: string;

  @Column({ type: 'bytea', transformer: hexTransformer, nullable: true })
  public address: string;

  @Column({ type: 'enum', enum: CreatorStatus })
  public status: CreatorStatus;
}
