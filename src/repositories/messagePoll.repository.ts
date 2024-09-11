import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { MessagePoll } from '../entities/messagePoll.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class MessagePollRepository extends BaseRepository<MessagePoll> {
  public constructor(unitOfWork: UnitOfWork) {
    super(MessagePoll, unitOfWork);
  }
}
