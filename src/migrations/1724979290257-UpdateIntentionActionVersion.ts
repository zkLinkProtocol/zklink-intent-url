import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIntentionActionVersion1724979290257
  implements MigrationInterface
{
  name = 'UpdateIntentionActionVersion1724979290257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention" ADD "actionVersion" character varying NOT NULL DEFAULT 'v1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention" DROP COLUMN "actionVersion"`,
    );
  }
}
