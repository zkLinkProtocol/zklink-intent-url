import { ApiProperty } from '@nestjs/swagger';

export class PagingMetaDto {
  @ApiProperty({
    type: Number,
    description: 'current page',
    example: '1',
  })
  public readonly currentPage: number;

  @ApiProperty({
    type: Number,
    description: 'items per page',
    example: '1',
  })
  public readonly itemsPerPage: number;

  @ApiProperty({
    type: Number,
    description: 'totalI items',
    example: '1',
  })
  public readonly totalItems: number;

  @ApiProperty({
    type: Number,
    description: 'total pages',
    example: '1',
  })
  public readonly totalPages: number;
}

export class ResponseDto<T> {
  @ApiProperty({
    type: Number,
    description: 'code, 200:success, 400:fail',
    example: '1',
  })
  public readonly code: number;

  @ApiProperty({
    type: String,
    description: 'error message, if code is 200, it will be empty string',
    example: 'Service exception',
  })
  public readonly message: string;

  @ApiProperty({
    type: PagingMetaDto,
    description: 'pagination info',
    example: {
      currentPage: 1,
      itemCount: 1,
      itemsPerPage: 1,
      totalItems: 1,
      totalPages: 1,
    },
  })
  public readonly meta?: PagingMetaDto;

  @ApiProperty({
    type: 'object',
    description:
      'if errno is 0, it will be the response data, otherwise it will be null',
    example: {},
  })
  data: T | null;
}
