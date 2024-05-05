import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiProperty({
  })
  @Get()
  EXECUTE_SEED() {
    return this.seedService.runSeed();
  }
}
