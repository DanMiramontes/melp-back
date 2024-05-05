import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RestaturantModule } from 'src/restaturant/restaturant.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    RestaturantModule
  ]
})
export class SeedModule {}
