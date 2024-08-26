import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterIntentionRecord1724313578258 implements MigrationInterface {
  name = 'AlterIntentionRecord1724313578258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP COLUMN "bundleHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "opUserHash" bytea`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "opUserChainId" integer`,
    );

    await queryRunner.query(
      `ALTER TYPE "public"."intention_record_status_enum" RENAME TO "intention_record_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_status_enum" AS ENUM('waiting', 'pending', 'success', 'faild')`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "status" TYPE "public"."intention_record_status_enum" USING "status"::"text"::"public"."intention_record_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."intention_record_status_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."intention_record_status_enum_old" AS ENUM('pending', 'success', 'faild')`,
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
      `ALTER TABLE "intention_record" DROP COLUMN "opUserChainId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP COLUMN "opUserHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "bundleHash" bytea`,
    );
  }
}
