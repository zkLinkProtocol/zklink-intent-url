import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatorTable1725552731494 implements MigrationInterface {
  name = 'UpdateCreatorTable1725552731494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_181cb532d9c2f6318b05b6aa2c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad79ed24bbd4bc63b9e774cf1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" DROP COLUMN "publickey"`,
    );
    await queryRunner.query(`ALTER TABLE "creator" DROP COLUMN "publicId"`);
    await queryRunner.query(`ALTER TABLE "creator" DROP COLUMN "publickey"`);
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "address" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "address" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "address" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ALTER COLUMN "address" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "creator" ADD "publickey" bytea`);
    await queryRunner.query(
      `ALTER TABLE "creator" ADD "publicId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "intention_record" ADD "publickey" bytea`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ad79ed24bbd4bc63b9e774cf1f" ON "creator" ("publickey") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_181cb532d9c2f6318b05b6aa2c" ON "intention_record" ("publickey") `,
    );
  }
}
