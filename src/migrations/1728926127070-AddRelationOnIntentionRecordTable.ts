import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationOnIntentionRecordTable1728926127070
  implements MigrationInterface
{
  name = 'AddRelationOnIntentionRecordTable1728926127070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "intention_record_tx";`);
    await queryRunner.query(`DELETE FROM "intention_record";`);

    await queryRunner.query(
      `ALTER TYPE "public"."intention_record_status_enum" RENAME TO "intention_record_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_status_enum" AS ENUM('waiting', 'pending', 'success', 'failed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "status" TYPE "public"."intention_record_status_enum" USING "status"::"text"::"public"."intention_record_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."intention_record_status_enum_old"`,
    );

    await queryRunner.query(
      `ALTER TYPE "public"."intention_record_tx_status_enum" RENAME TO "intention_record_tx_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_tx_status_enum" AS ENUM('pending', 'success', 'failed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ALTER COLUMN "status" TYPE "public"."intention_record_tx_status_enum" USING "status"::"text"::"public"."intention_record_tx_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."intention_record_tx_status_enum_old"`,
    );

    await queryRunner.query(
      `ALTER TABLE "intention_record" RENAME COLUMN "intention" TO "actionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP COLUMN "actionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "actionId" character varying(20) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD CONSTRAINT "FK_409e50e5e6cfc088829c4f3f8c6" FOREIGN KEY ("intentionCode") REFERENCES "intention"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD CONSTRAINT "FK_94b96619b94ade9beefbd89ecfa" FOREIGN KEY ("actionId") REFERENCES "action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_tx_status_enum_old" AS ENUM('pending', 'success', 'faild')`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ALTER COLUMN "status" TYPE "public"."intention_record_tx_status_enum_old" USING "status"::"text"::"public"."intention_record_tx_status_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."intention_record_tx_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."intention_record_tx_status_enum_old" RENAME TO "intention_record_tx_status_enum"`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_status_enum_old" AS ENUM('waiting', 'pending', 'success', 'faild')`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "status" TYPE "public"."intention_record_status_enum_old" USING "status"::"text"::"public"."intention_record_status_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."intention_record_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."intention_record_status_enum_old" RENAME TO "intention_record_status_enum"`,
    );

    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP CONSTRAINT "FK_94b96619b94ade9beefbd89ecfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP CONSTRAINT "FK_409e50e5e6cfc088829c4f3f8c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP COLUMN "actionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "actionId" jsonb NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" RENAME COLUMN "actionId" TO "intention"`,
    );
  }
}
