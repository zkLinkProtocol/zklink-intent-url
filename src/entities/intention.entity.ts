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
import { Commission } from './commission.entity';
import { Creator } from './creator.entity';
import { IntentionRecord } from './intentionRecord.entity';

@Entity()
export class Intention extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  public code: string;

  @ManyToOne(() => Creator, (creator) => creator.id)
  @JoinColumn({ name: 'creatorId' })
  @Index()
  public readonly creator: Creator;

  @ManyToOne(() => Action, (action) => action.intentions)
  @JoinColumn({ name: 'actionId' })
  @Index()
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

  @OneToMany(
    () => IntentionRecord,
    (intentionRecord) => intentionRecord.intention,
  )
  public intentionRecords: IntentionRecord[];

  @OneToMany(() => Commission, (commission) => commission.intention)
  public commissions: Commission[];
}
