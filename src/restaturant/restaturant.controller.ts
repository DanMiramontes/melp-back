import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { RestaturantService } from './restaturant.service';
import { CreateRestaturantDto } from './dto/create-restaturant.dto';
import { UpdateRestaturantDto } from './dto/update-restaturant.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { responseSearchDto } from './dto/responseSearch.dto';

@ApiTags('Restaurants')
@ApiBearerAuth()
@Controller('restaurants')
export class RestaturantController {
  constructor(private readonly restaturantService: RestaturantService) {}

  @Get('statistics/')
  @ApiResponse({ status: 200, description: 'Found', type : responseSearchDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.user)
  statistics(
    @Query('latitude') latitude: Number,
    @Query('longitude') longitude: Number ,
    @Query('radius') radius: Number,
  ){
    return this.restaturantService.statistics(latitude, longitude, radius);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Product was created', type: CreateRestaturantDto  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  create(@Body() createRestaturantDto: CreateRestaturantDto) {
    return this.restaturantService.create(createRestaturantDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get restaurants', type: CreateRestaturantDto , isArray: true})
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.user)
  findAll(@Body() paginationDto: PaginationDto) {
    return this.restaturantService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get restaurant by id'  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.user)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaturantService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update', type: UpdateRestaturantDto  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateRestaturantDto: UpdateRestaturantDto) {
    return this.restaturantService.update(id, updateRestaturantDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete'  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.restaturantService.remove(id);
  }


  
}
