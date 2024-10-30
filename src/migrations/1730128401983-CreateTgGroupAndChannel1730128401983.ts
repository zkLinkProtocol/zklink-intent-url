import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTgGroupAndChannel1730128401983
  implements MigrationInterface
{
  name = 'Migrations1730128401983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tg_group_and_channel" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "chatId" character varying NOT NULL, "chatTitle" character varying NOT NULL, "chatType" character varying NOT NULL, "fromId" character varying NOT NULL, "fromUsername" character varying NOT NULL, "lang" character varying NOT NULL, "fromIsBot" integer NOT NULL, "inviteDate" integer NOT NULL, CONSTRAINT "PK_956e1245b846059e7902206e2ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3f5618b8f33bc1efef7edcf32a" ON "tg_group_and_channel" ("chatId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f5618b8f33bc1efef7edcf32a"`,
    );
    await queryRunner.query(`DROP TABLE "tg_group_and_channel"`);
  }
}
