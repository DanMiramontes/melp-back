import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaturantService } from './restaturant.service';
import { CreateRestaturantDto } from './dto/create-restaturant.dto';
import { UpdateRestaturantDto } from './dto/update-restaturant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('restaturant')
export class RestaturantController {
  constructor(private readonly restaturantService: RestaturantService) {}


  @Post()
  create(@Body() createRestaturantDto: CreateRestaturantDto) {
    return this.restaturantService.create(createRestaturantDto);
  }

  @Get()
  findAll() {
    return this.restaturantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaturantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaturantDto: UpdateRestaturantDto) {
    return this.restaturantService.update(+id, updateRestaturantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaturantService.remove(+id);
  }
  
}
