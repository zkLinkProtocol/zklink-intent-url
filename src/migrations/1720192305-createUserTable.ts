import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1720192305000 implements MigrationInterface {
  name = 'CreateUserTable1720192305000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE userType AS ENUM ('passkey', 'eoa');`);

    await queryRunner.query(
      `CREATE TABLE "intent_user" (
        "publicKey" bytea NOT NULL,
        "type" userType NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "pk_user_id" PRIMARY KEY ("publicKey"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public".intent_user`);
    await queryRunner.query(`DROP TYPE "public".userType`);
  }
}
