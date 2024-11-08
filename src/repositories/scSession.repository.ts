import { Injectable } from '@nestjs/common';

import { ScSession } from 'src/entities/scSession.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class ScSessionRepository extends BaseRepository<ScSession> {
  public constructor(unitOfWork: UnitOfWork) {
    super(ScSession, unitOfWork);
  }

  async getData(sessionId: string): Promise<string> {
    const res = await this.findOneBy({ sessionId });
    return res?.data ?? '';
  }

  async setData(sessionId: string, data: string): Promise<void> {
    return await this.upsert({ sessionId, data }, true, ['sessionId']);
  }
}
