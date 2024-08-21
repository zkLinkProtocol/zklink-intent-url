import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { IntentionRecordTx } from './intentionRecordTx.entity';
import { hexTransformer } from '../transformers/hex.transformer';

export enum IntentionRecordStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILD = 'faild',
}

@Entity()
@Index(['intentionCode'])
@Index(['publickey'])
@Index(['address'])
export class IntentionRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'varchar' })
  public intentionCode: string;

  @Column({ type: 'bytea', transformer: hexTransformer, nullable: true })
  public publickey: string;

  @Column({ type: 'bytea', transformer: hexTransformer, nullable: true })
  public address: string;

  @Column({ type: 'enum', enum: IntentionRecordStatus })
  public status: IntentionRecordStatus;

  @Column({ type: 'jsonb' })
  public intention: object;

  // join intention record txs
  @OneToMany(
    () => IntentionRecordTx,
    (intentionRecordTx) => intentionRecordTx.intentionRecord,
  )
  public intentionRecordTxs: IntentionRecordTx[];

  @Column({ type: 'bytea', transformer: hexTransformer, nullable: true })
  public bundleHash: string;
}
