import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateActionId1727448951646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM action WHERE id = 'split-order'`);
  }

  public async down(): Promise<void> {}
}
