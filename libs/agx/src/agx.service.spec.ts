import { Test, TestingModule } from '@nestjs/testing';

import { AgxService } from './agx.service';

describe('AgxService', () => {
  let service: AgxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgxService],
    }).compile();

    service = module.get<AgxService>(AgxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
