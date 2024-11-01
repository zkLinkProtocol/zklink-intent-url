import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity()
@Index(['chatId'], { unique: true })
export class TgGroupAndChannel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'varchar' })
  public chatId: string;

  @Column({ type: 'varchar' })
  public chatTitle: string;

  @Column({ type: 'varchar' })
  public chatType: string;

  @Column({ type: 'varchar' })
  public fromId: string;

  @Column({ type: 'varchar' })
  public fromUsername: string;

  @Column({ type: 'int' })
  public fromIsBot: number;

  @Column({ type: 'int' })
  public inviteDate: number;

  @Column({ type: 'varchar' })
  public lang: string;

  @Column({ type: 'varchar' })
  public commissionAddress: string;
}
