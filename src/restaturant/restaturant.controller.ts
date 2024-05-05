import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { RestaturantService } from './restaturant.service';
import { CreateRestaturantDto } from './dto/create-restaturant.dto';
import { UpdateRestaturantDto } from './dto/update-restaturant.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaturantController {
  constructor(private readonly restaturantService: RestaturantService) {}

  @Get('statistics/')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.user)
  statistics(
    @Query('latitude') latitude: Number,
    @Query('longitude') longitude: Number ,
    @Query('radius') radius: Number,
  ){
    return this.restaturantService.statistics(latitude, longitude, radius);
  }



  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  create(@Body() createRestaturantDto: CreateRestaturantDto) {
    return this.restaturantService.create(createRestaturantDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.user)
  findAll(@Body() paginationDto: PaginationDto) {
    return this.restaturantService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaturantService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateRestaturantDto: UpdateRestaturantDto) {
    return this.restaturantService.update(id, updateRestaturantDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.restaturantService.remove(id);
  }


  
}
