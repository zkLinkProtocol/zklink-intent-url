import { PartialType } from '@nestjs/mapped-types';
import { CreateActionUrlDto } from './create-action-url.dto';

export class UpdateActionUrlDto extends PartialType(CreateActionUrlDto) {}
