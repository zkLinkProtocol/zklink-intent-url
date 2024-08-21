import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIntentionRecordTxFk1724225441206 implements MigrationInterface {
  name = 'AddIntentionRecordTxFk1724225441206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" ADD CONSTRAINT "FK_3deac0791bf973f98ccafb5f6d2" FOREIGN KEY ("intentionRecordId") REFERENCES "intention_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intention_record_tx" DROP CONSTRAINT "FK_3deac0791bf973f98ccafb5f6d2"`,
    );
  }
}
