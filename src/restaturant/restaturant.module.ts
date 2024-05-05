import { Module } from '@nestjs/common';
import { RestaturantService } from './restaturant.service';
import { RestaturantController } from './restaturant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaturant } from './entities/restaturant.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RestaturantController],
  providers: [RestaturantService],
  imports: [
    TypeOrmModule.forFeature([Restaturant]),
    AuthModule,
  ],
  exports:[
    TypeOrmModule,
    RestaturantService,
  ]
})
export class RestaturantModule {}
