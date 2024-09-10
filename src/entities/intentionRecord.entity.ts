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
  WAITING = 'waiting',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILD = 'faild',
}

@Entity()
@Index(['intentionCode'])
@Index(['address'])
export class IntentionRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'varchar' })
  public intentionCode: string;

  @Column({ type: 'bytea', transformer: hexTransformer })
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
}
