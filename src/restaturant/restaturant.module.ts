import { Module } from '@nestjs/common';
import { RestaturantService } from './restaturant.service';
import { RestaturantController } from './restaturant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaturant } from './entities/restaturant.entity';

@Module({
  controllers: [RestaturantController],
  providers: [RestaturantService],
  imports: [
    TypeOrmModule.forFeature([Restaturant])
  ],
  exports:[
    TypeOrmModule,
  ]
})
export class RestaturantModule {}
