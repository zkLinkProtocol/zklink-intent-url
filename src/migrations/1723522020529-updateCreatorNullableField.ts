import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatorNullableField1723522020529
  implements MigrationInterface
{
  name = 'UpdateCreatorNullableField1723522020529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "publicId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "publickey" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "address" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "address" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "publickey" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator" ALTER COLUMN "publicId" SET NOT NULL`,
    );
  }
}
