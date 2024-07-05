import { Test, TestingModule } from '@nestjs/testing';
import { ActionUrlService } from './action-url.service';

describe('ActionUrlService', () => {
  let service: ActionUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionUrlService],
    }).compile();

    service = module.get<ActionUrlService>(ActionUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
