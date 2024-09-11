import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMessgepoll1726044518291 implements MigrationInterface {
  name = 'CreateMessgepoll1726044518291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_poll" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "chatId" character varying NOT NULL, "messageId" character varying NOT NULL, "long" integer NOT NULL, "short" integer NOT NULL, CONSTRAINT "PK_59ba29be96f6ba6ec0a9f582fe4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_98a12604031b4463c4f78f9ee1" ON "message_poll" ("chatId", "messageId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_98a12604031b4463c4f78f9ee1"`,
    );
    await queryRunner.query(`DROP TABLE "message_poll"`);
  }
}
