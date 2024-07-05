import { ActionId } from 'src/actions/adapter';
import {
  IsNotEmpty,
  IsDecimal,
  IsJSON,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class ActionUrl {
  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsNotEmpty()
  @IsDecimal()
  commission: number;

  @IsJSON()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsJSON()
  @IsOptional()
  component?: Record<string, any>;

  @IsNotEmpty()
  actionId: ActionId;
}

export class ActionUrlPreview extends ActionUrl {
  @IsNotEmpty()
  @IsDateString()
  expiredAt: Date;
}
