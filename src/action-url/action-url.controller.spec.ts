import { Test, TestingModule } from '@nestjs/testing';
import { ActionUrlController } from './action-url.controller';
import { ActionUrlService } from './action-url.service';

describe('ActionUrlController', () => {
  let controller: ActionUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionUrlController],
      providers: [ActionUrlService],
    }).compile();

    controller = module.get<ActionUrlController>(ActionUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
