import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIntentionRecordTable1724173165062
  implements MigrationInterface
{
  name = 'CreateIntentionRecordTable1724173165062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_status_enum" AS ENUM('pending','success', 'faild')`,
    );
    await queryRunner.query(
      `CREATE TABLE "intention_record" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "intentionCode" character varying NOT NULL, "publickey" bytea, "address" bytea, "status" "public"."intention_record_status_enum" NOT NULL, "intention" jsonb NOT NULL, "bundleHash" bytea, CONSTRAINT "PK_83a4a49b1d7f417b618fd977e58" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_acef01de54eb4bdad83839a8f3" ON "intention_record" ("address") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_181cb532d9c2f6318b05b6aa2c" ON "intention_record" ("publickey") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_409e50e5e6cfc088829c4f3f8c" ON "intention_record" ("intentionCode") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_tx_status_enum" AS ENUM('pending', 'success', 'faild')`,
    );
    await queryRunner.query(
      `CREATE TABLE "intention_record_tx" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "intentionRecordId" integer NOT NULL, "txHash" bytea NOT NULL, "chainId" integer NOT NULL, "status" "public"."intention_record_tx_status_enum" NOT NULL, CONSTRAINT "PK_90360e5acfd1eb5a78451b6483c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3deac0791bf973f98ccafb5f6d" ON "intention_record_tx" ("intentionRecordId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3deac0791bf973f98ccafb5f6d"`,
    );
    await queryRunner.query(`DROP TABLE "intention_record_tx"`);
    await queryRunner.query(
      `DROP TYPE "public"."intention_record_tx_status_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_409e50e5e6cfc088829c4f3f8c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_181cb532d9c2f6318b05b6aa2c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_acef01de54eb4bdad83839a8f3"`,
    );
    await queryRunner.query(`DROP TABLE "intention_record"`);
    await queryRunner.query(
      `DROP TYPE "public"."intention_record_status_enum"`,
    );
  }
}
