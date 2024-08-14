import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1723451428655 implements MigrationInterface {
  name = 'CreateTable1723451428655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."creator_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "creator" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "publicId" character varying NOT NULL, "publickey" bytea NOT NULL, "address" bytea NOT NULL, "status" "public"."creator_status_enum" NOT NULL, CONSTRAINT "PK_43e489c9896f9eb32f7a0b912c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b0a70384cd0d4a601ead21c0f4" ON "creator" ("address") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ad79ed24bbd4bc63b9e774cf1f" ON "creator" ("publickey") `,
    );
    await queryRunner.query(
      `CREATE TABLE "intention" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "code" character varying NOT NULL, "creatorId" integer NOT NULL, "actionId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "metadata" character varying NOT NULL, "content" text NOT NULL, "settings" jsonb NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_0a8e6162c44d361415629cce490" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b648296e4e523b6801168d5ba4" ON "intention" ("creatorId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "intention" ADD CONSTRAINT "FK_b648296e4e523b6801168d5ba42" FOREIGN KEY ("creatorId") REFERENCES "creator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention" DROP CONSTRAINT "FK_b648296e4e523b6801168d5ba42"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b648296e4e523b6801168d5ba4"`,
    );
    await queryRunner.query(`DROP TABLE "intention"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad79ed24bbd4bc63b9e774cf1f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b0a70384cd0d4a601ead21c0f4"`,
    );
    await queryRunner.query(`DROP TABLE "creator"`);
    await queryRunner.query(`DROP TYPE "public"."creator_status_enum"`);
  }
}
