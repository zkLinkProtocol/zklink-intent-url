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
  FAILED = 'failed',
}

@Entity()
@Index(['txHash', 'chainId'], { unique: true })
@Index(['opUserHash', 'chainId'], { unique: true })
export class IntentionRecordTx extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @ManyToOne(() => IntentionRecord, (intentionRecord) => intentionRecord.id)
  @JoinColumn({ name: 'intentionRecordId' })
  @Index()
  public intentionRecord: IntentionRecord;

  @Column({ type: 'bytea', transformer: hexTransformer, nullable: true })
  public opUserHash: string;

  @Column({ type: 'bytea', transformer: hexTransformer, nullable: true })
  public txHash: string;

  @Column({ type: 'int' })
  public chainId: number;

  @Column({ type: 'enum', enum: IntentionRecordTxStatus })
  public status: IntentionRecordTxStatus;
}
