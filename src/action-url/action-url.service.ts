import { Injectable } from '@nestjs/common';
import { CreateActionUrlDto } from './dto/create-action-url.dto';
import { UpdateActionUrlDto } from './dto/update-action-url.dto';

@Injectable()
export class ActionUrlService {
  create(createActionUrlDto: CreateActionUrlDto) {
    return 'This action adds a new actionUrl';
  }

  findAll() {
    return `This action returns all actionUrl`;
  }

  find(path: string) {
    return `This action returns a #${path} actionUrl`;
  }

  update(id: number, updateActionUrlDto: UpdateActionUrlDto) {
    return `This action updates a #${id} actionUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionUrl`;
  }
}
