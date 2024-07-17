import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable, Logger } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';

import { BusinessException } from 'src/exception/business.exception';

import { DB_COMMIT_DURATION_METRIC_NAME } from '../metrics';

export declare type IsolationLevel =
  | 'READ UNCOMMITTED'
  | 'READ COMMITTED'
  | 'REPEATABLE READ'
  | 'SERIALIZABLE';

export interface IDbTransaction {
  waitForExecution: () => Promise<void>;
  commit: () => Promise<void>;
  ensureRollbackIfNotCommitted: () => Promise<void>;
}

@Injectable()
export class UnitOfWork {
  private readonly logger: Logger;
  private readonly asyncLocalStorage: AsyncLocalStorage<{
    queryRunner: QueryRunner;
  }>;

  public constructor(
    @InjectMetric(DB_COMMIT_DURATION_METRIC_NAME)
    private readonly dbCommitDurationMetric: Histogram,
    private readonly dataSource: DataSource,
    private readonly entityManager: EntityManager,
  ) {
    this.logger = new Logger(UnitOfWork.name);
    this.asyncLocalStorage = new AsyncLocalStorage();
  }

  public getTransactionManager(): EntityManager {
    const store = this.asyncLocalStorage.getStore();
    const queryRunner = store?.queryRunner;
    return queryRunner?.manager || this.entityManager;
  }

  public useTransaction(
    action: () => Promise<void>,
    preventAutomaticCommit = false,
    logContext?: Record<string, string | number>,
    isolationLevel?: IsolationLevel,
  ): IDbTransaction {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    let isReleased = false;

    const release = async () => {
      this.logger.debug({
        message: 'Releasing the unit of work',
        ...logContext,
      });
      await queryRunner.release();
    };

    const commit = async () => {
      if (isReleased) {
        throw new BusinessException(
          'The transaction cannot be committed as it connection is released',
        );
      }
      isReleased = true;
      try {
        this.logger.debug({
          message: 'Committing the transaction',
          ...logContext,
        });
        const stopDbCommitDurationMeasuring =
          this.dbCommitDurationMetric.startTimer();
        await queryRunner.commitTransaction();
        stopDbCommitDurationMeasuring();
      } catch (error) {
        this.logger.error(
          {
            message: 'Error while committing the transaction. Rolling back',
            ...logContext,
          },
          error.stack,
        );
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await release();
      }
    };

    const rollback = async () => {
      if (isReleased) {
        return;
      }
      isReleased = true;
      try {
        await queryRunner.rollbackTransaction();
      } finally {
        await release();
      }
    };

    const executionPromise = this.asyncLocalStorage.run(
      {
        queryRunner,
      },
      async () => {
        await queryRunner.connect();
        await queryRunner.startTransaction(isolationLevel);

        try {
          await action();
        } catch (error) {
          this.logger.error(
            {
              message: 'Error while processing the transaction. Rolling back',
              ...logContext,
            },
            error.stack,
          );
          await rollback();
          throw error;
        }

        if (!preventAutomaticCommit) {
          await commit();
        }
      },
    );

    return {
      waitForExecution: () => executionPromise,
      commit,
      ensureRollbackIfNotCommitted: rollback,
    };
  }
}
