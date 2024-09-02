import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;

  @DeleteDateColumn()
  public readonly deletedAt?: Date;
}
