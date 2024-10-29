import { Injectable } from '@nestjs/common';

import { TgGroupAndChannel } from 'src/entities/tgGroupAndChannel.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class TgGroupAndChannelRepository extends BaseRepository<TgGroupAndChannel> {
  public constructor(unitOfWork: UnitOfWork) {
    super(TgGroupAndChannel, unitOfWork);
  }
}
