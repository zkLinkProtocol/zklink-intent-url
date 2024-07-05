import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActionUrlService } from './action-url.service';
import { CreateActionUrlDto } from './dto/create-action-url.dto';
import { UpdateActionUrlDto } from './dto/update-action-url.dto';

@Controller('action-url')
export class ActionUrlController {
  constructor(private readonly actionUrlService: ActionUrlService) {}

  @Get(':path')
  find(@Param('path') path: string) {
    return this.actionUrlService.find(path);
  }

  @Get()
  findAll() {
    return this.actionUrlService.findAll();
  }
}
