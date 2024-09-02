import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Intention } from './intention.entity';
import {
  AuthorDto,
  DAppDto,
  IntentDto,
  MagicLinkMetadataDto,
  NetworkDto,
} from '../common/dto';

@Entity()
export abstract class Action extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  public readonly id: string;

  @Column({ type: 'varchar', length: 40 })
  public readonly title: string;

  @Column({ type: 'varchar', length: 255 })
  public readonly logo: string;

  @Column({ type: 'jsonb' })
  public readonly networks: NetworkDto[];

  @Column({ type: 'varchar', length: 255 })
  public readonly description: string;

  @Column({ type: 'jsonb' })
  public readonly author: AuthorDto;

  @Column({ type: 'jsonb', name: 'dApp' })
  public readonly dApp: DAppDto;

  @Column({ type: 'jsonb', default: {} })
  public readonly magicLinkMetadata: MagicLinkMetadataDto;

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
