/* import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// request dto
export class LoginByPasskeyRequestDto {
  @IsNotEmpty()
  @IsString()
  publicKey: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class LoginByPrivatekeyRequestDto extends LoginByPasskeyRequestDto {}

// response dto
export class LoginByPasskeyResponseDto {
  @ApiProperty({ description: 'Token name' })
  token: string;
}

export class LoginByPrivatekeyResponseDto {
  @ApiProperty({ description: 'Token name' })
  token: string;
}
 */

import { ActionId } from './adapter';
import { ActionMetadata } from './interface';

export class ActionResponseDto extends ActionMetadata {
  id: ActionId;

  constructor(id: ActionId, metadata: ActionMetadata) {
    super();
    this.id = id;
    this.title = metadata.title;
    this.description = metadata.description;
    this.metadata = metadata.metadata;
    this.network = metadata.network;
    this.dApp = metadata.dApp;
    this.author = metadata.author;
    this.intent = metadata.intent;
  }
}
