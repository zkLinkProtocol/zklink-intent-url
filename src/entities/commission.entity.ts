import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from './action.entity';
import { Intention } from './intention.entity';
import { hexTransformer } from '../transformers/hex.transformer';

@Entity({ name: 'commission' })
export class Commission {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public fromAddress: string;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public toAddress: string;

  @Column({ type: 'bytea', transformer: hexTransformer })
  public tokenAddress: string;

  @Column({ type: 'bigint' })
  public tokenAmount: bigint;

  @Index()
  @Column({ type: 'varchar' })
  public intentionCode: string;

  @Index()
  @Column({ type: 'varchar', length: 20 })
  public actionId: string;

  @ManyToOne(() => Intention, (intention) => intention.commissions)
  @JoinColumn({ name: 'intentionCode' })
  public intention: Intention;

  @ManyToOne(() => Action, (action) => action.commissions)
  @JoinColumn({ name: 'actionId' })
  public action: Action;
}
