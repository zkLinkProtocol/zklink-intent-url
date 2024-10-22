import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity()
@Index(['chatId', 'messageId'], { unique: true })
export class TgMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'varchar' })
  public chatId: string;

  @Column({ type: 'varchar' })
  public messageId: string;

  @Column({ type: 'varchar' })
  public code: string;

  @Column({ type: 'varchar' })
  public text: string;
}
