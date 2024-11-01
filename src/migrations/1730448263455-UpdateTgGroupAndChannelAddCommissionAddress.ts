import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTgGroupAndChannelAddCommissionAddress1730448263455
  implements MigrationInterface
{
  name = 'UpdateTgGroupAndChannelAddCommissionAddress1730448263455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" ADD "commissionAddress" character varying NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" DROP COLUMN "commissionAddress"`,
    );
  }
}
