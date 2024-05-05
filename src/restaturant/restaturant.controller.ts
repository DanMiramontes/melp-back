import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RestaturantService } from './restaturant.service';
import { CreateRestaturantDto } from './dto/create-restaturant.dto';
import { UpdateRestaturantDto } from './dto/update-restaturant.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Restaurants')
@Controller('restaturant')
export class RestaturantController {
  constructor(private readonly restaturantService: RestaturantService) {}


  @Post()
  create(@Body() createRestaturantDto: CreateRestaturantDto) {
    return this.restaturantService.create(createRestaturantDto);
  }

  @Get()
  findAll(@Body() paginationDto: PaginationDto) {
    return this.restaturantService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaturantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateRestaturantDto: UpdateRestaturantDto) {
    return this.restaturantService.update(id, updateRestaturantDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.restaturantService.remove(id);
  }
  
}
