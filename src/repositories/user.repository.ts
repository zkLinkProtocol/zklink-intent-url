import { Injectable } from '@nestjs/common';

import { User } from 'src/entities/user.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  public constructor(unitOfWork: UnitOfWork) {
    super(User, unitOfWork);
  }
}
