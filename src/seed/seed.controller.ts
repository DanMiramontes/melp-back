import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Restaurants')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}


  @Get()
  @Auth(ValidRoles.admin)
  EXECUTE_SEED() {
    return this.seedService.runSeed();
  }
}
