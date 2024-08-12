import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveContentField1723475741413 implements MigrationInterface {
  name = 'RemoveContentField1723475741413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "intention" DROP COLUMN "content"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention" ADD "content" text NOT NULL`,
    );
  }
}
