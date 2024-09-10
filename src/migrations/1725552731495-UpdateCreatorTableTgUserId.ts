import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatorTableTgUserId1725552731495
  implements MigrationInterface
{
  name = 'UpdateCreatorTableTgUserId1725552731495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`update creator set "tgUserId" = null`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
