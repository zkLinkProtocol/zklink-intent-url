import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LRUCache } from 'lru-cache';
import { nanoid } from 'nanoid';

import { BaseController } from 'src/common/base.controller';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ResponseDto } from 'src/common/response.dto';

import { HubRequestDto } from './hub.dto';

const options = {
  // Cache item time-to-live (TTL) in milliseconds
  ttl: 1000 * 100,
  // Should stale items be returned before removal?
  allowStale: false,
  // Automatically purge expired items
  ttlAutopurge: true,
};

const cache = new LRUCache<string, string>(options);

@Controller('hub')
@ApiTags('hub')
export class HubController extends BaseController {
  constructor() {
    super();
  }

  @Get('')
  @CommonApiOperation('Return the value of hub.')
  async get(
    @Headers('sessionId') sessionId: string,
  ): Promise<ResponseDto<string>> {
    // 1. Get sessionId from header
    // 2. Get value from cache by sessionId, check if it is expired or not
    // 3. Return value

    // Check if sessionId is provided
    if (!sessionId) {
      return this.error('Session ID is required');
    }

    // Get the cached value for the sessionId
    const value = cache.get(sessionId);

    // If the value is undefined, it means the sessionId is expired or does not exist
    if (value === undefined) {
      return this.error('Session ID not found or expired');
    }

    // Return the cached value
    return this.success(value);
  }

  @Post('')
  @CommonApiOperation('Create a new hub.')
  async create(): Promise<ResponseDto<string>> {
    // 1. Create a random string as sessionId
    // 2. Set sessionId to cache, value default '', expire time is 100s
    // 3. Return sessionId

    // Generate a random UUID as sessionId
    const sessionId = nanoid(50);

    // Set the sessionId with default value '' in the cache, with a custom TTL of 100 seconds
    cache.set(sessionId, '');

    // Return the generated sessionId
    return this.success(sessionId);
  }

  @Put('')
  @CommonApiOperation(`Update hub's value.`)
  async save(
    @Body() request: HubRequestDto,
    @Headers('sessionId') sessionId: string,
  ): Promise<ResponseDto<boolean>> {
    // 1. Get data from request
    // 2. Get sessionId from header, check if it is expired or not
    // 3. If it is expired, return error
    // 4. Update value = data by sessionId in cache

    // Check if sessionId is provided
    if (!sessionId) {
      return this.error('Session ID is required');
    }

    // Check if the sessionId exists in the cache
    const currentValue = cache.get(sessionId);
    if (currentValue === undefined) {
      return this.error('Session ID not found or expired');
    }

    // Update the cache with the new data
    cache.set(sessionId, request.data);

    // Return success
    return this.success(true);
  }
}
