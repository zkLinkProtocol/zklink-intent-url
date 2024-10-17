import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateCommissionTable1729164178964
  implements MigrationInterface
{
  name = 'GenerateCommissionTable1729164178964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b648296e4e523b6801168d5ba4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_409e50e5e6cfc088829c4f3f8c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3deac0791bf973f98ccafb5f6d"`,
    );
    await queryRunner.query(
      `CREATE TABLE "commission" ("id" SERIAL NOT NULL, "fromAddress" bytea NOT NULL, "toAddress" bytea NOT NULL, "tokenAddress" bytea NOT NULL, "txHash" bytea NOT NULL, "tokenAmount" bigint NOT NULL, "intentionCode" character varying, "actionId" character varying(20), CONSTRAINT "PK_d108d70411783e2a3a84e386601" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention" DROP CONSTRAINT "FK_b648296e4e523b6801168d5ba42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention" ALTER COLUMN "creatorId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP CONSTRAINT "FK_409e50e5e6cfc088829c4f3f8c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP CONSTRAINT "FK_94b96619b94ade9beefbd89ecfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "intentionCode" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "actionId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" DROP CONSTRAINT "FK_3deac0791bf973f98ccafb5f6d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ALTER COLUMN "intentionRecordId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention" ADD CONSTRAINT "FK_b648296e4e523b6801168d5ba42" FOREIGN KEY ("creatorId") REFERENCES "creator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "commission" ADD CONSTRAINT "FK_6be249520a3a57df957264c069e" FOREIGN KEY ("intentionCode") REFERENCES "intention"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "commission" ADD CONSTRAINT "FK_d3604fab6fa4a907e28f9c275fc" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD CONSTRAINT "FK_409e50e5e6cfc088829c4f3f8c6" FOREIGN KEY ("intentionCode") REFERENCES "intention"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD CONSTRAINT "FK_94b96619b94ade9beefbd89ecfa" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ADD CONSTRAINT "FK_3deac0791bf973f98ccafb5f6d2" FOREIGN KEY ("intentionRecordId") REFERENCES "intention_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" DROP CONSTRAINT "FK_3deac0791bf973f98ccafb5f6d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP CONSTRAINT "FK_94b96619b94ade9beefbd89ecfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP CONSTRAINT "FK_409e50e5e6cfc088829c4f3f8c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "commission" DROP CONSTRAINT "FK_d3604fab6fa4a907e28f9c275fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "commission" DROP CONSTRAINT "FK_6be249520a3a57df957264c069e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention" DROP CONSTRAINT "FK_b648296e4e523b6801168d5ba42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ALTER COLUMN "intentionRecordId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ADD CONSTRAINT "FK_3deac0791bf973f98ccafb5f6d2" FOREIGN KEY ("intentionRecordId") REFERENCES "intention_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "actionId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "intentionCode" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD CONSTRAINT "FK_94b96619b94ade9beefbd89ecfa" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD CONSTRAINT "FK_409e50e5e6cfc088829c4f3f8c6" FOREIGN KEY ("intentionCode") REFERENCES "intention"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention" ALTER COLUMN "creatorId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention" ADD CONSTRAINT "FK_b648296e4e523b6801168d5ba42" FOREIGN KEY ("creatorId") REFERENCES "creator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "commission"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_3deac0791bf973f98ccafb5f6d" ON "intention_record_tx" ("intentionRecordId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_409e50e5e6cfc088829c4f3f8c" ON "intention_record" ("intentionCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b648296e4e523b6801168d5ba4" ON "intention" ("creatorId") `,
    );
  }
}
