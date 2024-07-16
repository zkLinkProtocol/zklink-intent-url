import { BaseEntity } from './base.entity';
import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { hexTransformer } from '../transformers/hex.transformer';

export enum CreatorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity({ name: 'intent_creator' })
@Index(['publickey'], { unique: true })
@Index(['address'], { unique: true })
export class Creator extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  public readonly id: bigint;

  @Column({ type: 'varchar' })
  public publicid: string;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public publickey: string;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public address: string;

  @Column({ type: 'enum', enum: CreatorStatus })
  public status: CreatorStatus;
}
