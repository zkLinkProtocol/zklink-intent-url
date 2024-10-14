import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { NetworkDto } from 'src/common/dto';

import { Action } from './action.entity';
import { BaseEntity } from './base.entity';
import { Creator } from './creator.entity';
import { IntentionRecord } from './intentionRecord.entity';

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

  @Column({ type: 'varchar' })
  public actionId: string;

  @ManyToOne(() => Action, (action) => action.intentions)
  @JoinColumn({ name: 'actionId' })
  public action: Action;

  @Column({ type: 'varchar', default: 'v1' })
  public actionVersion: string;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'varchar' })
  public metadata: string;

  @Column({ type: 'jsonb' })
  public settings: {
    newsType: string;
    intentInfo: {
      network: NetworkDto;
      components: Array<{
        name: string;
        value: any;
      }>;
    };
  };

  @Column({ type: 'boolean', default: true })
  public active: boolean;

  @OneToMany(() => IntentionRecord, (record) => record.intention)
  public intentionRecords: IntentionRecord[];
}
