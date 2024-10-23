import { Injectable } from '@nestjs/common';

import { TgMessage } from 'src/entities/tgMessage.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class TgMessageRepository extends BaseRepository<TgMessage> {
  public constructor(unitOfWork: UnitOfWork) {
    super(TgMessage, unitOfWork);
  }
}
