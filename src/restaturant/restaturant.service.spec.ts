import { Test, TestingModule } from '@nestjs/testing';
import { RestaturantService } from './restaturant.service';

describe('RestaturantService', () => {
  let service: RestaturantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaturantService],
    }).compile();

    service = module.get<RestaturantService>(RestaturantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
