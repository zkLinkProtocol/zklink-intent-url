import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatorTGUserIdIndex1726215072474
  implements MigrationInterface
{
  name = 'UpdateCreatorTGUserIdIndex1726215072474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad79ed24bbd4bc63b9e774cf1d"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_60f7438991901737496f2ddc4c" ON "creator" ("tgUserId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60f7438991901737496f2ddc4c"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ad79ed24bbd4bc63b9e774cf1d" ON "creator" ("tgUserId") `,
    );
  }
}
