import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { IntentionRecordStatus } from 'src/entities/intentionRecord.entity';
import { IntentionRecordTxStatus } from 'src/entities/intentionRecordTx.entity';

import { ActionUrlFindOneResponseDto } from './actionUrl.dto';

// request dto
export class IntentionRecordTxRequestDto {
  @ApiProperty({
    name: 'txHash',
    description: 'Tx hash of the intention record tx.',
    example: '0x123456',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  txHash: string;

  @ApiProperty({
    name: 'chainId',
    description: 'ChainId of intention record.',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  chainId: number;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created time of intention record.',
    example: '2021-10-10 10:10:10',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  createdAt: string;
}

export class IntentionRecordAddRequestDto {
  @ApiProperty({
    name: 'publicKey',
    description: 'If sign by passkey.',
    example: '0x1234567890',
  })
  @IsString()
  publicKey: string;

  @ApiProperty({
    name: 'address',
    description: 'If sign by private key.',
    example: '0x1234567890',
  })
  @IsString()
  address: string;

  @ApiProperty({
    name: 'bundleHash',
    description: 'bundle hash by response of solver.',
    example: '0x123456',
  })
  @IsString()
  @IsNotEmpty()
  bundleHash: string;

  @ApiProperty({
    name: 'txs',
    description: 'Txs of the intention record.',
    example: IntentionRecordTxRequestDto,
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  txs: IntentionRecordTxRequestDto[];
}

// response dto
export class IntentionRecordListItemResponseDto {
  @ApiProperty({
    name: 'id',
    description: 'id of intention record.',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    name: 'title',
    description: 'Title of intention.',
    example: 'swap eth to usdt',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'status',
    description: 'Status of intention record.',
    example: 'success',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  status: IntentionRecordStatus;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created time of intention record.',
    example: '2021-10-10 10:10:10',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  createdAt: string;
}

export class IntentionRecordTxListItemResponseDto {
  @ApiProperty({
    name: 'txHash',
    description: 'Tx hash of the intention record tx.',
    example: '0x123456',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  txHash: string;

  @ApiProperty({
    name: 'chainId',
    description: 'ChainId of intention record.',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  chainId: number;

  @ApiProperty({
    name: 'status',
    description: 'Status of intention record tx.',
    example: 'success',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  status: IntentionRecordTxStatus;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created time of intention record.',
    example: '2021-10-10 10:10:10',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  createdAt: Date;
}

export class IntentionRecordFindOneResponseDto {
  @ApiProperty({
    name: 'intention',
    description: 'Intention info.',
    example: ActionUrlFindOneResponseDto,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  intention: ActionUrlFindOneResponseDto;

  @ApiProperty({
    name: 'txs',
    description: 'Txs of the intention record.',
    example: ActionUrlFindOneResponseDto,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  intentionRecordTxs: IntentionRecordTxListItemResponseDto[];

  @ApiProperty({
    name: 'status',
    description: 'Status of intention record.',
    example: 'success',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  status: IntentionRecordStatus;

  @ApiProperty({
    name: 'createdAt',
    description: 'Created time of intention record.',
    example: '2021-10-10 10:10:10',
    required: true,
  })
  @IsNotEmpty()
  createdAt: Date;
}
