import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Intention } from './intention.entity';
import { AuthorDto, DAppDto, IntentDto, NetworkDto } from '../common/dto';

@Entity()
export abstract class Action extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 8 })
  public readonly id: string;

  @Column({ type: 'varchar', length: 40 })
  public readonly title: string;

  @Column({ type: 'varchar', length: 60 })
  public readonly logo: string;

  @Column({ type: 'jsonb' })
  public readonly network: NetworkDto;

  @Column({ type: 'varchar', length: 255 })
  public readonly description: string;

  @Column({ type: 'jsonb' })
  public readonly author: AuthorDto;

  @Column({ type: 'jsonb', name: 'dApp' })
  public readonly dApp: DAppDto;

  @Column({ type: 'jsonb' })
  @Index('idx_dapp_name_gin', { synchronize: false })
  public readonly intent: IntentDto;

  @OneToMany(() => Intention, (intention) => intention.actionId)
  public intentions: Intention[];

  @Index()
  @Column({ type: 'int', default: 0 })
  public intentionCount: number;

  @Index()
  @Column({ type: 'int', default: 0 })
  public interaction: number;
}
