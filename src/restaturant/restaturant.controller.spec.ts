import { Test, TestingModule } from '@nestjs/testing';
import { RestaturantController } from './restaturant.controller';
import { RestaturantService } from './restaturant.service';

describe('RestaturantController', () => {
  let controller: RestaturantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaturantController],
      providers: [RestaturantService],
    }).compile();

    controller = module.get<RestaturantController>(RestaturantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
