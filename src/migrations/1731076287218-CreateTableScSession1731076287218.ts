import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableScSession1731076287218 implements MigrationInterface {
  name = 'CreateTableScSession1731076287218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sc_session" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "sessionId" character varying NOT NULL, "data" character varying NOT NULL, CONSTRAINT "PK_fb10d649e63815947580f4c6407" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c8eae9e5d612665913e4346081" ON "sc_session" ("sessionId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c8eae9e5d612665913e4346081"`,
    );
    await queryRunner.query(`DROP TABLE "sc_session"`);
  }
}
