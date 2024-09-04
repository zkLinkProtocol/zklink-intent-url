import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateActionMagicLinkMetadata1725295160397
  implements MigrationInterface
{
  name = 'UpdateActionMagicLinkMetadata1725295160397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "action" ADD "magicLinkMetadata" jsonb NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "action" DROP COLUMN "magicLinkMetadata"`,
    );
  }
}
