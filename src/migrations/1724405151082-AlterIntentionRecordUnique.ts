import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterIntentionRecordUnique1724405151082
  implements MigrationInterface
{
  name = 'AlterIntentionRecordUnique1724405151082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "opUserChainId" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d7e06e1eaa7ad0b1897c40fe02" ON "intention_record_tx" ("txHash", "chainId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f9ae6c3cb88bb3315f5cf4398c" ON "intention_record" ("opUserHash", "opUserChainId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f9ae6c3cb88bb3315f5cf4398c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d7e06e1eaa7ad0b1897c40fe02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "opUserChainId" DROP NOT NULL`,
    );
  }
}
