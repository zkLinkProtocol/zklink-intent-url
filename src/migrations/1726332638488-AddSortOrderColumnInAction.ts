import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSortOrderColumnInAction1726332638488
  implements MigrationInterface
{
  name = 'AddSortOrderColumnInAction1726332638488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "action" ADD "sortOrder" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd89724456f880e6d3a9e8f32d" ON "action" ("sortOrder") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bd89724456f880e6d3a9e8f32d"`,
    );
    await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "sortOrder"`);
  }
}
