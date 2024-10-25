import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexOnRelations1729844496110 implements MigrationInterface {
  name = 'AddIndexOnRelations1729844496110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bace3f0d89f11600bace6e7bdd"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_093c3efa7863983a7e02e38f02" ON "tg_message" ("chatId", "messageId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b648296e4e523b6801168d5ba4" ON "intention" ("creatorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b7409224328b3c1fe7e09e3f0" ON "intention" ("actionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6be249520a3a57df957264c069" ON "commission" ("intentionCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d3604fab6fa4a907e28f9c275f" ON "commission" ("actionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_409e50e5e6cfc088829c4f3f8c" ON "intention_record" ("intentionCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_94b96619b94ade9beefbd89ecf" ON "intention_record" ("actionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3deac0791bf973f98ccafb5f6d" ON "intention_record_tx" ("intentionRecordId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3deac0791bf973f98ccafb5f6d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_94b96619b94ade9beefbd89ecf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_409e50e5e6cfc088829c4f3f8c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d3604fab6fa4a907e28f9c275f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6be249520a3a57df957264c069"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8b7409224328b3c1fe7e09e3f0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b648296e4e523b6801168d5ba4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_093c3efa7863983a7e02e38f02"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_bace3f0d89f11600bace6e7bdd" ON "tg_message" ("chatId", "messageId") `,
    );
  }
}
