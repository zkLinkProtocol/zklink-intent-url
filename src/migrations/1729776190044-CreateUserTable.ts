import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1729776190044 implements MigrationInterface {
  name = 'CreateUserTable1729776190044';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "address" bytea NOT NULL, "tgUserId" character varying, "tgUserName" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2ab9e8d5bac0d7e3c61b9e7993" ON "user" ("tgUserId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3122b4b8709577da50e89b6898" ON "user" ("address") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3122b4b8709577da50e89b6898"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ab9e8d5bac0d7e3c61b9e7993"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
