import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RestaturantModule } from 'src/restaturant/restaturant.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    RestaturantModule,
    AuthModule
  ]
})
export class SeedModule {}
