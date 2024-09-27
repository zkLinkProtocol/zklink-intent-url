import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterIntentionRecordColumn1725958951384
  implements MigrationInterface
{
  name = 'AlterIntentionRecordColumn1725958951384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f9ae6c3cb88bb3315f5cf4398c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP COLUMN "opUserHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP COLUMN "opUserChainId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ADD "opUserHash" bytea`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ALTER "txHash" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1eeca54dab5d091218b0c9aae5" ON "intention_record_tx" ("opUserHash", "chainId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1eeca54dab5d091218b0c9aae5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" DROP COLUMN "opUserHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "opUserChainId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "opUserHash" bytea`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f9ae6c3cb88bb3315f5cf4398c" ON "intention_record" ("opUserHash", "opUserChainId") `,
    );
  }
}
