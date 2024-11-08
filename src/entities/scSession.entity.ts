import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity()
@Index(['sessionId'], { unique: true })
export class ScSession extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: bigint;

  @Column({ type: 'varchar' })
  public sessionId: string;

  @Column({ type: 'varchar' })
  public data: string;
}
