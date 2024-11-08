import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTgGroupAndChannelAddCommission1730719031713
  implements MigrationInterface
{
  name = 'UpdateTgGroupAndChannelAddCommission1730719031713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" ADD "commissionTgUserId" character varying NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" ADD "commissionTgUserName" character varying NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" ADD "addressExpireAt" TIMESTAMP NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" DROP COLUMN "addressExpireAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" DROP COLUMN "commissionTgUserName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tg_group_and_channel" DROP COLUMN "commissionTgUserId"`,
    );
  }
}
