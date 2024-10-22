import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTgMessageTable1729603619729 implements MigrationInterface {
  name = 'CreateTgMessageTable1729603619729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tg_message" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "chatId" character varying NOT NULL, "messageId" character varying NOT NULL, "code" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_32b0f4bd543c3cedf59363f2976" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_bace3f0d89f11600bace6e7bdd" ON "tg_message" ("chatId","messageId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bace3f0d89f11600bace6e7bdd"`,
    );
    await queryRunner.query(`DROP TABLE "tg_message"`);
  }
}
