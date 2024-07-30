import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1720192305000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "creatorStatus" AS ENUM ('active', 'inactive');`,
    );

    await queryRunner.query(
      `CREATE TABLE "intent_creator" (
        id SERIAL PRIMARY KEY,
        "publicid" varchar(100) UNIQUE,
        "publickey" bytea UNIQUE,
        "address" bytea UNIQUE,
        "status" "creatorStatus" NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP DEFAULT null -- soft deleted
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "intent_actionUrl" (
        "code" varchar(100) 5 KEY NOT NULL, -- url: https://host/pk/{code}, rule:uuid(0-9a-z,length:8)
        "creatorId" int NOT NULL,
        "actionId" varchar(100) NOT NULL,
        "title" varchar(100) NOT NULL,
        "description" varchar(200) NOT NULL,
        "metadata" varchar(200)  NOT NULL,
        "content" text NOT NULL,
        "settings" text NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "deletedAt" TIMESTAMP DEFAULT null -- soft deleted
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_intent_actionUrl_creatorId" ON "intent_actionUrl" ("creatorId") `,
    );

    await queryRunner.query(
      `CREATE TABLE "intent_actionUrlDraft" (
        "code" varchar(100) PRIMARY KEY NOT NULL, 
        "creatorId" int NOT NULL,
        "actionId" varchar(100) ,
        "title" varchar(100) ,
        "description" varchar(200) ,
        "metadata" varchar(200)  ,
        "content" text ,
        "settings" text ,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_intent_actionUrlDraft_creatorId" ON "intent_actionUrlDraft" ("creatorId") `,
    );

    await queryRunner.query(
      `CREATE TABLE "intent_history" (
        "actionUrlCode" varchar(100) NOT NULL,
        "chainId" varchar(100) NOT NULL,
        "transactionHash" bytea PRIMARY KEY NOT NULL,
        "from" bytea NOT NULL,
        "to" bytea NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_intent_actionUrl_creatorId"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_intent_actionUrlDraft_creatorId"`,
    );
    await queryRunner.query(`DROP TABLE "public"."intent_history"`);
    await queryRunner.query(`DROP TABLE "public"."intent_actionUrlDraft"`);
    await queryRunner.query(`DROP TABLE "public"."intent_actionUrl"`);
    await queryRunner.query(`DROP TABLE "public"."intent_creator"`);
    await queryRunner.query(`DROP TYPE "public"."creatorStatus"`);
  }
}
