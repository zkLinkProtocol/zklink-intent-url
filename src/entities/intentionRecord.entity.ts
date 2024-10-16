import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from './action.entity';
import { BaseEntity } from './base.entity';
import { Intention } from './intention.entity';
import { IntentionRecordTx } from './intentionRecordTx.entity';
import { hexTransformer } from '../transformers/hex.transformer';

export enum IntentionRecordStatus {
  WAITING = 'waiting',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
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

  @ManyToOne(() => Intention, (intention) => intention.intentionRecords)
  @JoinColumn({ name: 'intentionCode' })
  public intention: Intention;

  @Column({ type: 'varchar', length: 20 })
  public actionId: string;

  @ManyToOne(() => Action, (action) => action.intentions)
  @JoinColumn({ name: 'actionId' })
  public action: Action;

  // join intention record txs
  @OneToMany(
    () => IntentionRecordTx,
    (intentionRecordTx) => intentionRecordTx.intentionRecord,
  )
  public intentionRecordTxs: IntentionRecordTx[];
}
