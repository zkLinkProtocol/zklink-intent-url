import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateCommissionTable1729065298330
  implements MigrationInterface
{
  name = 'GenerateCommissionTable1729065298330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "commission" ("id" SERIAL NOT NULL, "fromAddress" bytea NOT NULL, "toAddress" bytea NOT NULL, "tokenAddress" bytea NOT NULL, "tokenAmount" bigint NOT NULL, "intentionCode" character varying NOT NULL, "actionId" character varying(20) NOT NULL, CONSTRAINT "PK_d108d70411783e2a3a84e386601" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6be249520a3a57df957264c069" ON "commission" ("intentionCode") `,
    );
    await queryRunner.query(
      `ALTER TABLE "commission" ADD CONSTRAINT "FK_6be249520a3a57df957264c069e" FOREIGN KEY ("intentionCode") REFERENCES "intention"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "commission" ADD CONSTRAINT "FK_d3604fab6fa4a907e28f9c275fc" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commission" DROP CONSTRAINT "FK_d3604fab6fa4a907e28f9c275fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "commission" DROP CONSTRAINT "FK_6be249520a3a57df957264c069e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6be249520a3a57df957264c069"`,
    );
    await queryRunner.query(`DROP TABLE "commission"`);
  }
}
