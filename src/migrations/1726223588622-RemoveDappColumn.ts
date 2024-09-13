import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDappColumn1726223588622 implements MigrationInterface {
  name = 'RemoveDappColumn1726223588622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "dApp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "action" ADD "dApp" jsonb NOT NULL`);
  }
}
