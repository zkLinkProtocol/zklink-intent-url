import { BaseEntity } from './base.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Creator } from './creator.entity';

@Entity({ name: 'intent_actionUrl' })
@Index(['creatorId'])
export class ActionUrl extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  public code: string;

  @Column({ type: 'int' })
  public creatorId: bigint;

  @ManyToOne(() => Creator, (creator) => creator.id)
  @JoinColumn({ name: 'creatorId' })
  public readonly creator: Creator;

  @Column({ type: 'varchar' })
  public actionId: string;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'varchar' })
  public metadata: string;

  @Column({ type: 'varchar' })
  public content: string;

  @Column({ type: 'varchar' })
  public settings: string;
}