import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Action } from './action.entity';
import { BaseEntity } from './base.entity';
import { Creator } from './creator.entity';

@Entity()
@Index(['creatorId'])
export class Intention extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  public code: string;

  @Column({ type: 'int' })
  public creatorId: bigint;

  @ManyToOne(() => Creator, (creator) => creator.id)
  @JoinColumn({ name: 'creatorId' })
  public readonly creator: Creator;

  @ManyToOne(() => Action, (action) => action.intentions)
  @JoinColumn({ name: 'actionId' })
  public action: Action;

  @Column({ type: 'varchar' })
  public actionId: string;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'varchar' })
  public metadata: string;

  @Column({ type: 'jsonb' })
  public settings: object;

  @Column({ type: 'boolean', default: true })
  public active: boolean;
}
