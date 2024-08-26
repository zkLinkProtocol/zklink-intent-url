import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateActionTable21724408187569 implements MigrationInterface {
  name = 'CreateActionTable21724408187569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);
    await queryRunner.query(
      `CREATE TABLE "action" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying(20) NOT NULL, "title" character varying(40) NOT NULL, "logo" character varying(255) NOT NULL, "networks" jsonb NOT NULL, "description" character varying(255) NOT NULL, "author" jsonb NOT NULL, "dApp" jsonb NOT NULL, "intent" jsonb NOT NULL, "intentionCount" integer NOT NULL DEFAULT '0', "interaction" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dd5404c43fc1adcb4c242acc12" ON "action" ("intentionCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47dc39f427aa1175603d6e8945" ON "action" ("interaction") `,
    );
    await queryRunner.query(`
      CREATE INDEX idx_dapp_name_gin ON "action" USING gin ((("dApp"->>'name')) gin_trgm_ops);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_dapp_name_gin;
    `);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47dc39f427aa1175603d6e8945"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dd5404c43fc1adcb4c242acc12"`,
    );
    await queryRunner.query(`DROP TABLE "action"`);
  }
}
