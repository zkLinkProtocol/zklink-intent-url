import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMigrationIssue1726223381244 implements MigrationInterface {
  name = 'FixMigrationIssue1726223381244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const indexExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND indexname = 'idx_ad79ed24bbd4bc63b9e774cf1d'
      )
    `);

    if (indexExists[0].exists) {
      await queryRunner.query(
        `DROP INDEX "public"."IDX_ad79ed24bbd4bc63b9e774cf1d"`,
      );
    }

    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_60f7438991901737496f2ddc4c" ON "creator" ("tgUserId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60f7438991901737496f2ddc4c"`,
    );
  }
}
