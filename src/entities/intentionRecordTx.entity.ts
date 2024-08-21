import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { IntentionRecord } from './intentionRecord.entity';
import { hexTransformer } from '../transformers/hex.transformer';

export enum IntentionRecordTxStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILD = 'faild',
}

@Entity()
@Index(['intentionRecordId'])
export class IntentionRecordTx extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'int' })
  public intentionRecordId: bigint;

  @ManyToOne(() => IntentionRecord, (intentionRecord) => intentionRecord.id)
  @JoinColumn({ name: 'intentionRecordId' })
  public readonly intentionRecord: IntentionRecord;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public txHash: string;

  @Column({ type: 'int' })
  public chainId: number;

  @Column({ type: 'enum', enum: IntentionRecordTxStatus })
  public status: IntentionRecordTxStatus;
}
