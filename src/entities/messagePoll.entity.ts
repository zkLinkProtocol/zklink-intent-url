import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity()
@Index(['chatId', 'messageId'])
export class MessagePoll extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'varchar' })
  public chatId: string;

  @Column({ type: 'varchar' })
  public 'messageId': string;

  @Column({ type: 'int' })
  public long: number;

  @Column({ type: 'int' })
  public short: number;
}
