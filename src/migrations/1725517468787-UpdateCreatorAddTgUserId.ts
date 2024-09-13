import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatorAddTgUserId1725517468787
  implements MigrationInterface
{
  name = 'UpdateCreatorAddTgUserId1725517468787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creator" ADD "tgUserId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "creator" ADD "tgUserName" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "creator" DROP COLUMN "tgUserId"`);
    await queryRunner.query(`ALTER TABLE "creator" DROP COLUMN "tgUserName"`);
  }
}
